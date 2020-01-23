// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content } from 'mapiThriftModels/Content';
import { IBlockElement as BlockElement } from 'mapiThriftModels/BlockElement';
import { ITag as Tag } from 'mapiThriftModels/Tag';
import { isFeature, isAnalysis, isImmersive, isReview, articleMainImage, articleContributors, articleSeries } from 'capi';
import { Option, fromNullable, None, Some } from 'types/option';
import { Err, Ok, Result } from 'types/result';
import { IBlock as Block, ICapiDateTime as CapiDateTime } from 'mapiThriftModels';

// ----- Types ----- //

const enum Layout {
    Standard,
    Immersive,
    Feature,
    Review,
    Analysis,
    Opinion,
    Liveblog,
    Gallery,
    Interactive,
    Picture,
    Video,
    Audio,
}

interface ArticleFields {
    pillar: Pillar;
    headline: string;
    standfirst: Option<DocumentFragment>;
    byline: string;
    bylineHtml: Option<DocumentFragment>;
    publishDate: Option<Date>;
    mainImage: Option<Image>;
    contributors: Tag[];
    series: Tag;
    commentable: boolean;
    tags: Tag[];
}

type Liveblog = ArticleFields & {
    layout: Layout.Liveblog;
    blocks: LiveBlock[];
}

type Review = ArticleFieldsWithBody & {
    layout: Layout.Review;
    starRating: number;
}

type Standard = ArticleFieldsWithBody & {
    layout: Exclude<Layout, Layout.Liveblog | Layout.Review>;
}

type Article
    = Liveblog
    | Review
    | Standard;

const enum ElementKind {
    Text,
    Image,
    Pullquote,
    Interactive,
    RichLink,
    Tweet,
}

type Image = {
    kind: ElementKind.Image;
    alt: string;
    caption: string;
    displayCredit: boolean;
    credit: string;
    file: string;
    width: number;
    height: number;
}

type BodyElement = {
    kind: ElementKind.Text;
    doc: DocumentFragment;
} | Image | {
    kind: ElementKind.Pullquote;
    quote: string;
    attribution: Option<string>;
} | {
    kind: ElementKind.Interactive;
    url: string;
} | {
    kind: ElementKind.RichLink;
    url: string;
    linkText: string;
} | {
    kind: ElementKind.Tweet;
    content: NodeList;
};

type LiveBlock = {
    id: string;
    isKeyEvent: boolean;
    title: string;
    firstPublished: Option<Date>;
    lastModified: Option<Date>;
    body: Result<string, BodyElement>[];
}

type DocParser = (html: string) => DocumentFragment;

type ArticleFieldsWithBody = ArticleFields & {
    body: Result<string, BodyElement>[];
};


// ----- Functions ----- //

const tweetContent = (tweetId: string, doc: DocumentFragment): Result<string, NodeList> => {
    const blockquote = doc.querySelector('blockquote');

    if (blockquote !== null) {
        return new Ok(blockquote.childNodes);
    }

    return new Err(`There was no blockquote element in the tweet with id: ${tweetId}`);
}

const parseImage = (element: BlockElement): Option<Image> => {
    const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
    const { alt = "", caption = "", displayCredit = false, credit = "" } = element.imageTypeData ?? {};

    if (!masterAsset?.file || !masterAsset?.typeData?.width || !masterAsset?.typeData?.height) {
        return new None();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fromNullable(masterAsset).map((asset: any) => ({
        kind: ElementKind.Image,
        alt,
        caption,
        displayCredit,
        credit,
        file: asset.file,
        width: asset.typeData.width,
        height: asset.typeData.height,
    }));
}

const parseElement =
    (docParser: DocParser) => (element: BlockElement): Result<string, BodyElement> => {
    switch (element.type.toString()) {
        case 'text':
            const html = element?.textTypeData?.html;
            if (!html) {
                return new Err('No html field on textTypeData')
            }
            return new Ok({ kind: ElementKind.Text, doc: docParser(html) });

        case 'image':
            return parseImage(element)
                .fmap<Result<string, Image>>(image => new Ok(image))
                .withDefault(new Err('I couldn\'t find a master asset'));

        case 'pullquote':
            const { html: quote, attribution } = element.pullquoteTypeData ?? {};
            if (!quote) {
                return new Err('No quote field on pullquoteTypeData')
            }
            return new Ok({
                kind: ElementKind.Pullquote,
                quote,
                attribution: fromNullable(attribution),
            });

        case 'interactive':
            const { iframeUrl } = element.interactiveTypeData ?? {};
            if (!iframeUrl) {
                return new Err('No iframeUrl field on interactiveTypeData')
            }
            return new Ok({ kind: ElementKind.Interactive, url: iframeUrl });

        case 'rich-link':
            const { url, linkText } = element.richLinkTypeData ?? {};
            if (!url) {
                return new Err('No "url" field on richLinkTypeData');
            } else if (!linkText) {
                return new Err('No "linkText" field on richLinkTypeData');
            }
            return new Ok({ kind: ElementKind.RichLink, url, linkText });

        case 'tweet':
            const { id, html: h } = element.tweetTypeData ?? {};
            if (!id) {
                return new Err('No "id" field on tweetTypeData')
            } else if (!h) {
                return new Err('No "html" field on tweetTypeData')
            }
            return tweetContent(id, docParser(h))
                .map(content => ({ kind: ElementKind.Tweet, content }));

        default:
            return new Err(`I'm afraid I don't understand the element I was given: ${element.type}`);
    }

}

type Elements = BlockElement[] | undefined;

const parseElements =
    (docParser: DocParser) => (elements: Elements): Result<string, BodyElement>[] => {
        if (!elements) {
            return [new Err('No body elements available')];
        }
        return elements.map(parseElement(docParser));
    }

const capiDateTimeToDate = (date: CapiDateTime | undefined | string): Option<Date> => {
    // Thrift definitions define some dates as CapiDateTime but CAPI returns strings
    try {
        if (date && typeof date === 'string') {
            return new Some(new Date(date));
        }
        return new None();
    } catch(e) {
        console.error(`Unable to convert date from CAPI: ${e}`);
        return new None();
    }
}

const parseBlock = (docParser: DocParser) => (block: Block): LiveBlock =>
    ({
        id: block.id,
        isKeyEvent: block?.attributes?.keyEvent ?? false,
        title: block?.title ?? "",
        firstPublished: capiDateTimeToDate(block?.firstPublishedDate),
        lastModified: capiDateTimeToDate(block?.lastModifiedDate),
        body: parseElements(docParser)(block.elements),
    })

const parseBlocks = (docParser: DocParser) => (blocks: Block[]): LiveBlock[] =>
    blocks.map(parseBlock(docParser));

const articleFields = (docParser: DocParser, content: Content): ArticleFields =>
    ({
        pillar: pillarFromString(content?.pillarId),
        headline: content?.fields?.headline ?? "",
        standfirst: fromNullable(content?.fields?.standfirst).map(docParser),
        byline: content?.fields?.byline ?? "",
        bylineHtml: fromNullable(content?.fields?.bylineHtml).map(docParser),
        publishDate: capiDateTimeToDate(content.webPublicationDate),
        mainImage: articleMainImage(content).andThen(parseImage),
        contributors: articleContributors(content),
        series: articleSeries(content),
        commentable: content?.fields?.commentable ?? false,
        tags: content.tags,
    })

const articleFieldsWithBody = (docParser: DocParser, content: Content): ArticleFieldsWithBody => {
    const body = content?.blocks?.body ?? [];
    const elements = body[0]?.elements;
    return ({
        ...articleFields(docParser, content),
        body: elements !== undefined ? parseElements(docParser)(elements): [],
    });
}

const containsOpinionTags = (tags: Tag[]): boolean =>
    tags.some(tag => tag.id === 'tone/comment' || tag.id === 'tone/letters')

const fromCapi = (docParser: DocParser) => (content: Content): Article => {
    const { tags, pillarId, fields } = content;
    switch (content.type.toString()) {
        case 'article':
            if (pillarFromString(pillarId) === Pillar.opinion || containsOpinionTags(tags)) {
                return { layout: Layout.Opinion, ...articleFieldsWithBody(docParser, content) };

            } else if (isImmersive(content)) {
                return { layout: Layout.Immersive, ...articleFieldsWithBody(docParser, content) };

            } else if (isFeature(content)) {
                return { layout: Layout.Feature, ...articleFieldsWithBody(docParser, content) };

            } else if (isReview(content) && fields?.starRating) {
                return {
                    layout: Layout.Review,
                    starRating: fields.starRating,
                    ...articleFieldsWithBody(docParser, content),
                };

            } else if (isAnalysis(content)) {
                return { layout: Layout.Analysis, ...articleFieldsWithBody(docParser, content) };
            }

            return { layout: Layout.Standard, ...articleFieldsWithBody(docParser, content) };

        case 'liveblog':
            const body = content?.blocks?.body ?? [];
            return {
                layout: Layout.Liveblog,
                blocks: parseBlocks(docParser)(body),
                ...articleFields(docParser, content),
            };

        case 'gallery':
            return { layout: Layout.Gallery, ...articleFieldsWithBody(docParser, content) };

        case 'interactive':
            return { layout: Layout.Interactive, ...articleFieldsWithBody(docParser, content) };

        case 'picture':
            return { layout: Layout.Picture, ...articleFieldsWithBody(docParser, content) };

        case 'video':
            return { layout: Layout.Video, ...articleFieldsWithBody(docParser, content) };

        case 'audio':
            return { layout: Layout.Audio, ...articleFieldsWithBody(docParser, content) };

        default:
            return { layout: Layout.Standard, ...articleFieldsWithBody(docParser, content) };
    }
}


// ----- Exports ----- //

export {
    Article,
    Liveblog,
    Review,
    Standard,
    LiveBlock,
    Layout,
    ElementKind,
    BodyElement,
    Image,
    fromCapi,
};
