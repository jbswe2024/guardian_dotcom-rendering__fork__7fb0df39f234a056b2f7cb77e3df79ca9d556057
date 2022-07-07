import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, neutral, space, until } from '@guardian/source-foundations';
import { carrotAdStyles, labelStyles } from './AdSlot';

type Props = {
	format: ArticleFormat;
	children: React.ReactNode;
};

const articleWidth = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Interactive: {
			// These articles use a special template which manages it's own width
			return null;
		}
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return css`
				${from.desktop} {
					width: 700px;
				}
			`;
		}
		default: {
			return css`
				${from.desktop} {
					width: 620px;
				}
			`;
		}
	}
};

const articleWrapper = css`
	${until.leftCol} {
		/* below 1140 */
		padding-left: 0;
	}

	flex-grow: 1;

	/* Due to MainMedia using position: relative, this seems to effect the rendering order
		To mitigate we use z-index
		TODO: find a cleaner solution */
	z-index: 1;
`;

const adStyles = css`
	.ad-slot {
		@media print {
			/* stylelint-disable-next-line declaration-no-important */
			display: none !important;
		}
		&.ad-slot--collapse {
			display: none;
		}
	}
	.ad-slot--mostpop {
		${from.desktop} {
			margin: 0;
			width: auto;
		}
	}
	.ad-slot--fluid {
		width: 100%;
	}
	.ad-slot-container--liveblog {
		background-color: ${neutral[93]};
		margin: 0 auto ${space[3]}px;
		text-align: center;

		.ad-slot {
			margin-left: auto;
			margin-right: auto;
		}

		.ad-slot__label {
			color: ${neutral[46]};
			border-top-color: ${neutral[86]};
		}

		${from.mobile} {
			width: 300px;
		}

		${from.tablet} {
			width: 100%;
		}
	}

	/* Unlike other inlines do not float right inline1 */
	.ad-slot-container--article {
		margin-top: 12px;
		margin-bottom: 12px;

		${from.tablet} {
			background-color: ${neutral[97]};
		}

		.ad-slot {
			margin-left: auto;
			margin-right: auto;
		}

		.ad-slot--inline1, .ad-slot--top-above-nav {
			text-align: center;

			${from.mobile} {
				/* Prevent merger with any nearby float left elements e.g. rich-links */
				clear: left;
				width: 300px;
			}
			${from.tablet} {
				background-color: ${neutral[97]};
				width: auto;
			}
			&.ad-slot--fluid {
				width: 100%;
			}
		}

		// AKA inline2+
		.ad-slot--inline:not(.ad-slot--inline1) {
			${from.mobile} {
				/* Prevent merger with any nearby float left elements e.g. rich-links */
				clear: left;
			}

			&.ad-slot--fluid {
				width: 100%;
			}
		}


		&.ad-slot--offset-right {
			${from.desktop} {
				float: right;
				width: 300px;
				margin-right: -318px;
			}
	
			${from.wide} {
				margin-right: -398px;
			}
		}

	}
`;

export const ArticleContainer = ({ children, format }: Props) => {
	return (
		<div
			css={[
				articleWrapper,
				articleWidth(format),
				adStyles,
				carrotAdStyles,
				labelStyles,
			]}
		>
			{children}
		</div>
	);
};
