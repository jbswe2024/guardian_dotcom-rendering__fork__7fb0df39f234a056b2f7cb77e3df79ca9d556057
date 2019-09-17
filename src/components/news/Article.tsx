import React from 'react';

import HeaderImage from '../shared/HeaderImage';
import ArticleHeadline from './ArticleHeadline';
import ArticleStandfirst from './ArticleStandfirst';
import ArticleByline from './ArticleByline';
import ArticleBody from './ArticleBody';
import Tags from '../shared/Tags';

import { getPillarStyles, PillarId } from '../../styles';

interface ArticleProps {
    headline: string;
    standfirst: string;
    bylineHtml: string;
    webPublicationDate: string;
    body: string;
    tags: Tag[];
    feature: boolean;
    pillarId: PillarId;
    mainAssets: Asset[];
}

interface Asset {
    file: string;
    typeData: AssetTypeData;
}

interface AssetTypeData {
    altText: string;
    caption: string;
    credit: string;
    width: number;
    height: number;
}

interface Tag {
    webUrl: string;
    webTitle: string;
    type: string;
}

const Article = ({ headline, standfirst, bylineHtml, webPublicationDate, body, pillarId, tags, feature, mainAssets }: ArticleProps) => {
    const pillarStyles = getPillarStyles(pillarId);
    const contributors = tags.filter(tag => tag.type === 'contributor');
    // TODO: use context api to pass pillarStyles down to all components
    return (
        <React.Fragment>
            <HeaderImage assets={mainAssets}/>
            <ArticleHeadline headline={headline} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleStandfirst standfirst={standfirst} feature={feature} pillarStyles={pillarStyles}/>
            <ArticleByline byline={bylineHtml} pillarStyles={pillarStyles} publicationDate={webPublicationDate} contributors={contributors}/>
            <ArticleBody body={body} pillarStyles={pillarStyles}/>
            <Tags tags={tags}/>
        </React.Fragment>
    )
}

export default Article;
