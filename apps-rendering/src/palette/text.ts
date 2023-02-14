// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	brandAlt,
	culture,
	labs,
	lifestyle,
	neutral,
	news,
	opinion,
	specialReport,
	sport,
} from '@guardian/source-foundations';
import type { Colour } from './colour';

// ----- Functions ----- //

const adLabel = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const adLabelDark = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

const adSlot = (_format: ArticleFormat): Colour => {
	return neutral[20];
};

const mediaArticleBody = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const mediaArticleBodyLinkDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const branding = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[86];
		default:
			return neutral[20];
	}
};

const brandingDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const byline = (_format: ArticleFormat): Colour => {
	return neutral[46];
};

const bylineAnchor = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[300];
			case ArticlePillar.Culture:
				return culture[300];
			case ArticlePillar.Opinion:
				return opinion[300];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			case ArticleSpecial.Labs:
				return labs[300];
			case ArticleSpecial.SpecialReport:
				return brandAlt[300];
			case ArticleSpecial.SpecialReportAlt:
				return news[300];
			case ArticlePillar.News:
			default:
				return news[300];
		}
	}
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const bylineAnchorDark = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.Analysis) {
		switch (format.theme) {
			case ArticlePillar.Sport:
				return sport[500];
			case ArticlePillar.Culture:
				return culture[500];
			case ArticlePillar.Opinion:
				return opinion[500];
			case ArticlePillar.Lifestyle:
				return lifestyle[500];
			case ArticlePillar.News:
			default:
				return news[500];
		}
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const commentCount = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.LiveBlog) {
		return neutral[93];
	}

	if (format.design === ArticleDesign.DeadBlog) {
		return neutral[46];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const commentCountDark = (format: ArticleFormat): Colour => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return neutral[60];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const commentCountWide = (_format: ArticleFormat): Colour => {
	return neutral[46];
};

const dropCap = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.News:
			return news[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[300];
	}
};

const dropCapDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.News:
			return news[500];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const headline = ({ design, display, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.Interview:
			return neutral[100];
		case ArticleDesign.DeadBlog:
			return neutral[7];
		case ArticleDesign.Feature:
		case ArticleDesign.Review:
			if (display === ArticleDisplay.Immersive) {
				return neutral[100];
			}

			switch (theme) {
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticleSpecial.SpecialReportAlt:
					return neutral[7];
				default:
					return news[300];
			}
		default:
			if (display === ArticleDisplay.Immersive) {
				return neutral[100];
			}

			return neutral[7];
	}
};

const headlineDark = ({ design, theme }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return theme === ArticlePillar.Culture ? neutral[86] : neutral[93];
		case ArticleDesign.DeadBlog:
			return neutral[93];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return neutral[93];
				default:
					return neutral[86];
			}
		default:
			return neutral[86];
	}
};

const bylineLeftColumn = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[300];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[300];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
	}
};

const bylineLeftColumnDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.DeadBlog:
		default:
			return neutral[86];
	}
};
const bylineInline = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.DeadBlog:
		default:
			switch (format.theme) {
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[200];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticlePillar.News:
				default:
					return news[400];
			}
	}
};

const bylineInlineDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[93];
		case ArticleDesign.DeadBlog:
		default:
			return neutral[86];
	}
};

const designTag = (_format: ArticleFormat): Colour => neutral[100];

const designTagDark = (_format: ArticleFormat): Colour => neutral[10];

const follow = (format: ArticleFormat): Colour => {
	if (format.design === ArticleDesign.Gallery) {
		return neutral[86];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			switch (format.design) {
				case ArticleDesign.Analysis:
					return news[300];
				default:
					return news[400];
			}
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const followDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		case ArticleDesign.Gallery:
			return neutral[86];
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return specialReport[500];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return news[500];
			}
	}
};

const bylineDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const linkDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const articleLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[350];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return specialReport[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
		case ArticleDesign.Gallery:
			return neutral[86];
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[300];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return specialReport[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[300];
			}
	}
};

const interactiveAtomLink = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const keyEventsInline = ({ theme }: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Culture:
			return culture[350];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const keyEventsLeftColumn = ({ theme }: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const mediaArticleSeries = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const standfirst = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return neutral[86];
		default:
			return neutral[7];
	}
};

const standfirstDark = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[93];
		case ArticleDesign.Gallery:
			return neutral[86];
		default:
			return neutral[60];
	}
};

const standfirstLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[200];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
		case ArticleDesign.Gallery:
			return neutral[86];
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return news[500];
			}
		default: {
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}
		}
	}
};

const standfirstLinkDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return news[500];
			}
		default: {
			return neutral[60];
		}
	}
};

const kicker = (format: ArticleFormat): Colour => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return opinion[550];

	if (format.theme === ArticleSpecial.SpecialReport) {
		return brandAlt[400];
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return neutral[100];
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.Labs:
				default:
					return neutral[0];
			}
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return opinion[550];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[600];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[400];
			}
	}
};

const editionsKicker = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.Labs:
			return specialReport[400];
		default:
			return news[400];
	}
};

const seriesTitle = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[100];
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[100];
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return news[400];
			}

		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Opinion:
					return opinion[600];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return news[600];
			}
	}
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const relatedCard = (_format: ArticleFormat): Colour => {
	return neutral[100];
};

const relatedCardLink = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

const relatedCardLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const relatedCardTimeAgo = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Gallery:
			return neutral[100];
	}
	return neutral[46];
};

const relatedCardTimeAgoDark = (_format: ArticleFormat): Colour => neutral[60];

const richLink = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const richLinkDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
};

const richLinkAnchor = (_format: ArticleFormat): Colour => {
	return neutral[7];
};

const richLinkAnchorDark = (_format: ArticleFormat): Colour => {
	return neutral[60];
};

const seriesTitleDark = (format: ArticleFormat): Colour => {
	if (format.display === ArticleDisplay.Immersive) {
		return neutral[100];
	}

	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const pagination = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const pullquote = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Culture:
			return culture[400];
		case ArticlePillar.Opinion:
			return opinion[400];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return news[400];
	}
};

const pullquoteDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return news[500];
	}
};

const figCaption = (_format: ArticleFormat): Colour => neutral[46];

const figCaptionDark = (_format: ArticleFormat): Colour => neutral[60];

const tag = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return neutral[97];
		default:
			return neutral[7];
	}
};

const tagDark = (_format: ArticleFormat): Colour => neutral[86];

const paragraph = (_format: ArticleFormat): Colour => neutral[7];

const paragraphDark = (_format: ArticleFormat): Colour => neutral[86];

const newsletterSignUpForm = (_format: ArticleFormat): string => {
	return neutral[7];
};

const newsletterSignUpFormDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const privacyMessage = (_format: ArticleFormat): string => {
	return neutral[46];
};

const privacyMessageDark = (_format: ArticleFormat): string => {
	return neutral[46];
};

const newsletterSignUpFormButton = (_format: ArticleFormat): string => {
	return neutral[100];
};

const newsletterSignUpFormButtonDark = (_format: ArticleFormat): string => {
	return neutral[0];
};

const gallery = (_format: ArticleFormat): string => {
	return neutral[86];
};

const galleryDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const tableOfContentsTitle = (_format: ArticleFormat): string => {
	return neutral[7];
};

const tableOfContentsTitleDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

const headingTwoDark = (_format: ArticleFormat): string => {
	return neutral[86];
};

// ----- API ----- //

const text = {
	adLabel,
	adLabelDark,
	adSlot,
	articleLink,
	branding,
	brandingDark,
	byline,
	bylineAnchor,
	bylineAnchorDark,
	bylineDark,
	bylineLeftColumn,
	bylineLeftColumnDark,
	bylineInline,
	bylineInlineDark,
	commentCount,
	commentCountDark,
	commentCountWide,
	dropCap,
	dropCapDark,
	figCaption,
	figCaptionDark,
	follow,
	followDark,
	headline,
	headlineDark,
	designTag,
	designTagDark,
	interactiveAtomLink,
	keyEventsInline,
	keyEventsLeftColumn,
	kicker,
	editionsKicker,
	linkDark,
	mediaArticleBody,
	mediaArticleBodyLinkDark,
	mediaArticleSeries,
	pullquote,
	pullquoteDark,
	relatedCard,
	relatedCardLink,
	relatedCardLinkDark,
	relatedCardTimeAgo,
	relatedCardTimeAgoDark,
	richLink,
	richLinkAnchor,
	richLinkAnchorDark,
	richLinkDark,
	standfirst,
	standfirstDark,
	standfirstLink,
	standfirstLinkDark,
	seriesTitle,
	seriesTitleDark,
	tag,
	tagDark,
	pagination,
	paragraph,
	paragraphDark,
	newsletterSignUpForm,
	newsletterSignUpFormDark,
	privacyMessage,
	privacyMessageDark,
	newsletterSignUpFormButton,
	newsletterSignUpFormButtonDark,
	gallery,
	galleryDark,
	tableOfContentsTitle,
	tableOfContentsTitleDark,
	headingTwoDark,
};

// ----- Exports ----- //

export { text };
