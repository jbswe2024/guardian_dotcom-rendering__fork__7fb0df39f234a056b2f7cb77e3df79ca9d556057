import React from 'react';
import { css, Global } from '@emotion/react';

import {
	neutral,
	brandAltBackground,
	brandBackground,
	brandBorder,
	brandLine,
	labs,
	border,
	from,
	until,
} from '@guardian/source-foundations';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';

import { StarRating } from '../components/StarRating/StarRating';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleTitle } from '../components/ArticleTitle';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleMeta } from '../components/ArticleMeta';
import { SubMeta } from '../components/SubMeta';
import { MainMedia } from '../components/MainMedia';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { Standfirst } from '../components/Standfirst';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { MobileStickyContainer, AdSlot } from '../components/AdSlot';
import { Border } from '../components/Border';
import { GridItem } from '../components/GridItem';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Nav } from '../components/Nav/Nav';
import { LabsHeader } from '../components/LabsHeader.importable';

import { buildAdTargeting } from '../../lib/ad-targeting';
import {
	decideLineCount,
	decideLineEffect,
	getCurrentPillar,
} from '../lib/layoutHelpers';
import { Stuck, BannerWrapper } from './lib/stickiness';
import {
	interactiveGlobalStyles,
	interactiveLegacyClasses,
} from './lib/interactiveLegacyStyling';
import { Island } from '../components/Island';
import { OnwardsLower } from '../components/OnwardsLower.importable';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { decidePalette } from '../lib/decidePalette';

const InteractiveGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;
			${until.leftCol} {
				margin-left: 0px;
			}
			${from.leftCol} {
				margin-left: 151px;
			}
			${from.wide} {
				margin-left: 230px;
			}

			@supports (display: grid) {
				display: grid;
				width: 100%;
				margin-left: 0;

				grid-column-gap: 10px;

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
				*/
				${from.wide} {
					grid-template-columns: 219px 1px 1fr;

					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'.      border  media'
						'.      border  media'
						'.      border  lines'
						'.      border  meta'
						'body   body    body'
						'.      .       .';
				}

				/*
					Explanation of each unit of grid-template-columns

					Left Column (220 - 1px border)
					Vertical grey border
					Main content
				*/
				${until.wide} {
					grid-template-columns: 140px 1px 1fr;

					grid-template-areas:
						'title  border  headline'
						'.      border  standfirst'
						'.      border  media'
						'.      border  media'
						'.      border  lines'
						'.      border  meta'
						'body   body    body'
						'.      .       .';
				}

				${until.leftCol} {
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'media'
						'lines'
						'meta'
						'body'
						'.';
				}

				${until.desktop} {
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'title'
						'headline'
						'standfirst'
						'media'
						'lines'
						'meta'
						'body';
				}

				${until.tablet} {
					grid-column-gap: 0px;
					grid-template-columns: minmax(0, 1fr); /* Main content */
					grid-template-areas:
						'media'
						'title'
						'headline'
						'standfirst'
						'lines'
						'meta'
						'body';
				}
			}
		`}
	>
		{children}
	</div>
);

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const stretchMetaLines = css`
	margin: 0 -10px;
	${from.mobileLandscape} {
		margin: 0 -20px;
	}
	${from.tablet} {
		margin-right: -40px;
	}
	${from.leftCol} {
		margin-right: -20px;
	}
`;

const starWrapper = css`
	margin-bottom: 18px;
	margin-top: 6px;
	background-color: ${brandAltBackground.primary};
	display: inline-block;

	${until.phablet} {
		padding-left: 20px;
		margin-left: -20px;
	}
	${until.leftCol} {
		padding-left: 0px;
		margin-left: -0px;
	}

	padding-left: 10px;
	margin-left: -10px;
`;

interface Props {
	CAPI: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
}

export const InteractiveLayout = ({ CAPI, NAV, format }: Props) => {
	const {
		config: { isPaidContent, host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPI.isAdFreeUser,
		isSensitive: CAPI.config.isSensitive,
		videoDuration: CAPI.config.videoDuration,
		edition: CAPI.config.edition,
		section: CAPI.config.section,
		sharedAdTargeting: CAPI.config.sharedAdTargeting,
		adUnit: CAPI.config.adUnit,
	});

	const seriesTag = CAPI.tags.find(
		(tag) => tag.type === 'Series' || tag.type === 'Blog',
	);

	const showOnwardsLower = seriesTag && CAPI.hasStoryPackage;

	const showComments = CAPI.isCommentable;

	const { branding } = CAPI.commercialProperties[CAPI.editionId];

	const palette = decidePalette(format);

	return (
		<>
			{CAPI.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}

			<div>
				<Stuck>
					<div data-print-layout="hide">
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							shouldCenter={false}
						>
							<HeaderAdSlot
								isAdFreeUser={CAPI.isAdFreeUser}
								shouldHideAds={CAPI.shouldHideAds}
								display={format.display}
							/>
						</ElementContainer>
					</div>
				</Stuck>

				{format.theme !== ArticleSpecial.Labs && (
					<div data-print-layout="hide">
						<ElementContainer
							showTopBorder={false}
							showSideBorders={false}
							padded={false}
							backgroundColour={brandBackground.primary}
							element="header"
						>
							<Header
								edition={CAPI.editionId}
								idUrl={CAPI.config.idUrl}
								mmaUrl={CAPI.config.mmaUrl}
								supporterCTA={
									CAPI.nav.readerRevenueLinks.header.supporter
								}
								discussionApiUrl={CAPI.config.discussionApiUrl}
								isAnniversary={
									CAPI.config.switches.anniversaryHeaderSvg
								}
								urls={CAPI.nav.readerRevenueLinks.header}
								remoteHeader={CAPI.config.switches.remoteHeader}
								contributionsServiceUrl={
									CAPI.contributionsServiceUrl
								}
							/>
						</ElementContainer>
					</div>
				)}

				<ElementContainer
					showSideBorders={true}
					borderColour={brandLine.primary}
					showTopBorder={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="nav"
				>
					<Nav
						nav={NAV}
						format={{
							...format,
							theme: getCurrentPillar(CAPI),
						}}
						subscribeUrl={
							CAPI.nav.readerRevenueLinks.header.subscribe
						}
						edition={CAPI.editionId}
					/>
				</ElementContainer>

				{NAV.subNavSections && format.theme !== ArticleSpecial.Labs && (
					<ElementContainer
						backgroundColour={palette.background.article}
						padded={false}
						element="aside"
					>
						<Island deferUntil="idle">
							<SubNav
								subNavSections={NAV.subNavSections}
								currentNavLink={NAV.currentNavLink}
								format={format}
							/>
						</Island>
					</ElementContainer>
				)}

				{format.theme !== ArticleSpecial.Labs && (
					<ElementContainer
						backgroundColour={palette.background.article}
						padded={false}
						showTopBorder={false}
					>
						<Lines count={4} effect="straight" />
					</ElementContainer>
				)}
			</div>

			{format.theme === ArticleSpecial.Labs && (
				<Stuck>
					<ElementContainer
						showSideBorders={true}
						showTopBorder={false}
						backgroundColour={labs[400]}
						borderColour={border.primary}
						sectionId="labs-header"
					>
						<Island deferUntil="idle">
							<LabsHeader />
						</Island>
					</ElementContainer>
				</Stuck>
			)}

			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}
			<main>
				<ElementContainer
					data-print-layout="hide"
					showTopBorder={false}
					backgroundColour={palette.background.article}
					borderColour={palette.border.article}
					element="article"
					className={interactiveLegacyClasses.contentInteractive}
				>
					<div
						className={interactiveLegacyClasses.contentInteractive}
					>
						<InteractiveGrid>
							<GridItem area="title" element="aside">
								<div
									className={`${interactiveLegacyClasses.contentLabels} ${interactiveLegacyClasses.contentLabelsNotImmersive}`}
								>
									<ArticleTitle
										format={format}
										tags={CAPI.tags}
										sectionLabel={CAPI.sectionLabel}
										sectionUrl={CAPI.sectionUrl}
										guardianBaseURL={CAPI.guardianBaseURL}
										badge={CAPI.badge}
									/>
								</div>
							</GridItem>
							<GridItem area="border">
								{format.theme === ArticleSpecial.Labs ? (
									<></>
								) : (
									<Border format={format} />
								)}
							</GridItem>
							<GridItem area="headline">
								<div css={maxWidth}>
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
										webPublicationDateDeprecated={
											CAPI.webPublicationDateDeprecated
										}
										hasStarRating={
											!!CAPI.starRating ||
											CAPI.starRating === 0
										}
									/>
								</div>
								{CAPI.starRating || CAPI.starRating === 0 ? (
									<div css={starWrapper}>
										<StarRating
											rating={CAPI.starRating}
											size="large"
										/>
									</div>
								) : (
									<></>
								)}
							</GridItem>
							<GridItem area="standfirst">
								<Standfirst
									format={format}
									standfirst={CAPI.standfirst}
								/>
							</GridItem>
							<GridItem area="media">
								<div css={maxWidth}>
									<MainMedia
										format={format}
										elements={CAPI.mainMediaElements}
										adTargeting={adTargeting}
										host={host}
										pageId={CAPI.pageId}
										webTitle={CAPI.webTitle}
										ajaxUrl={CAPI.config.ajaxUrl}
										switches={CAPI.config.switches}
										isAdFreeUser={CAPI.isAdFreeUser}
										isSensitive={CAPI.config.isSensitive}
									/>
								</div>
							</GridItem>
							<GridItem area="lines">
								<div css={maxWidth}>
									<div css={stretchLines}>
										<Lines
											count={decideLineCount(
												format.design,
											)}
											effect={decideLineEffect(
												format.design,
												format.theme,
											)}
										/>
									</div>
								</div>
							</GridItem>
							<GridItem area="meta" element="aside">
								<div css={maxWidth}>
									<ArticleMeta
										branding={branding}
										format={format}
										pageId={CAPI.pageId}
										webTitle={CAPI.webTitle}
										author={CAPI.author}
										tags={CAPI.tags}
										primaryDateline={
											CAPI.webPublicationDateDisplay
										}
										secondaryDateline={
											CAPI.webPublicationSecondaryDateDisplay
										}
										isCommentable={CAPI.isCommentable}
										discussionApiUrl={
											CAPI.config.discussionApiUrl
										}
										shortUrlId={CAPI.config.shortUrlId}
										ajaxUrl={CAPI.config.ajaxUrl}
										showShareCount={
											CAPI.config.switches
												.serverShareCounts
										}
									/>
								</div>
							</GridItem>
							<GridItem area="body" element="article">
								<ArticleContainer format={format}>
									<ArticleBody
										format={format}
										blocks={CAPI.blocks}
										adTargeting={adTargeting}
										host={host}
										pageId={CAPI.pageId}
										webTitle={CAPI.webTitle}
										ajaxUrl={CAPI.config.ajaxUrl}
										switches={CAPI.config.switches}
										isSensitive={CAPI.config.isSensitive}
										isAdFreeUser={CAPI.isAdFreeUser}
										section={CAPI.config.section}
										shouldHideReaderRevenue={
											CAPI.shouldHideReaderRevenue
										}
										tags={CAPI.tags}
										isPaidContent={
											!!CAPI.config.isPaidContent
										}
										contributionsServiceUrl={
											CAPI.contributionsServiceUrl
										}
										contentType={CAPI.contentType}
										sectionName={CAPI.sectionName || ''}
										isPreview={CAPI.config.isPreview}
										idUrl={CAPI.config.idUrl || ''}
										isDev={!!CAPI.config.isDev}
									/>

									{/* <Lines data-print-layout="hide" count={4} /> */}
									<div css={stretchMetaLines}>
										<Lines
											count={4}
											data-print-layout="hide"
										/>
									</div>
									<SubMeta
										format={format}
										subMetaKeywordLinks={
											CAPI.subMetaKeywordLinks
										}
										subMetaSectionLinks={
											CAPI.subMetaSectionLinks
										}
										pageId={CAPI.pageId}
										webUrl={CAPI.webURL}
										webTitle={CAPI.webTitle}
										showBottomSocialButtons={
											CAPI.showBottomSocialButtons
										}
										badge={CAPI.badge}
									/>
								</ArticleContainer>
							</GridItem>
						</InteractiveGrid>
					</div>
				</ElementContainer>

				<ElementContainer
					data-print-layout="hide"
					padded={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={neutral[93]}
					element="aside"
				>
					<AdSlot
						data-print-layout="hide"
						position="merchandising-high"
						display={format.display}
					/>
				</ElementContainer>

				<Island clientOnly={true} deferUntil="visible">
					<OnwardsUpper
						ajaxUrl={CAPI.config.ajaxUrl}
						hasRelated={CAPI.hasRelated}
						hasStoryPackage={CAPI.hasStoryPackage}
						isAdFreeUser={CAPI.isAdFreeUser}
						pageId={CAPI.pageId}
						isPaidContent={CAPI.config.isPaidContent || false}
						showRelatedContent={CAPI.config.showRelatedContent}
						keywordIds={CAPI.config.keywordIds}
						contentType={CAPI.contentType}
						tags={CAPI.tags}
						format={format}
						pillar={format.theme}
						edition={CAPI.editionId}
						shortUrlId={CAPI.config.shortUrlId}
					/>
				</Island>

				{showOnwardsLower && (
					<ElementContainer
						sectionId="onwards-lower"
						element="section"
					>
						<Island clientOnly={true} deferUntil="visible">
							<OnwardsLower
								ajaxUrl={CAPI.config.ajaxUrl}
								hasStoryPackage={CAPI.hasStoryPackage}
								tags={CAPI.tags}
								format={format}
							/>
						</Island>
					</ElementContainer>
				)}

				{!isPaidContent && showComments && (
					<ElementContainer
						sectionId="comments"
						data-print-layout="hide"
						element="section"
					>
						<DiscussionLayout
							discussionApiUrl={CAPI.config.discussionApiUrl}
							shortUrlId={CAPI.config.shortUrlId}
							format={format}
							discussionD2Uid={CAPI.config.discussionD2Uid}
							discussionApiClientHeader={
								CAPI.config.discussionApiClientHeader
							}
							enableDiscussionSwitch={
								CAPI.config.switches.enableDiscussionSwitch
							}
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
						/>
					</ElementContainer>
				)}

				{!isPaidContent && (
					<ElementContainer data-print-layout="hide" element="aside">
						<MostViewedFooterLayout
							format={format}
							sectionName={CAPI.sectionName}
							ajaxUrl={CAPI.config.ajaxUrl}
						/>
					</ElementContainer>
				)}

				<ElementContainer
					data-print-layout="hide"
					padded={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={neutral[93]}
					element="aside"
				>
					<AdSlot position="merchandising" display={format.display} />
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={CAPI.nav.readerRevenueLinks.header}
					edition={CAPI.editionId}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
				/>
			</ElementContainer>

			<BannerWrapper data-print-layout="hide">
				<Island deferUntil="idle" clientOnly={true}>
					<StickyBottomBanner
						contentType={CAPI.contentType}
						contributionsServiceUrl={CAPI.contributionsServiceUrl}
						idApiUrl={CAPI.config.idApiUrl}
						isMinuteArticle={CAPI.pageType.isMinuteArticle}
						isPaidContent={CAPI.pageType.isPaidContent}
						isPreview={!!CAPI.config.isPreview}
						isSensitive={CAPI.config.isSensitive}
						keywordsId={CAPI.config.keywordIds}
						pageId={CAPI.pageId}
						section={CAPI.config.section}
						sectionName={CAPI.sectionName}
						shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
						switches={CAPI.config.switches}
						tags={CAPI.tags}
					/>
				</Island>
			</BannerWrapper>
			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
