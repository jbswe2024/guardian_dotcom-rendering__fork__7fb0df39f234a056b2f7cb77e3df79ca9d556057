import React from 'react';
import { sidePadding, sans, darkModeCss } from 'styles';
import { css, SerializedStyles } from '@emotion/core';
import { palette } from '@guardian/src-foundations';
import { formatDate } from 'date';
import { Contributor } from 'capi';
import Avatar from 'components/shared/avatar';
import Follow from 'components/shared/follow';
import { PillarStyles } from 'pillar';
import { componentFromHtml } from 'renderBlocks';

const ArticleBylineStyles = ({ kicker }: PillarStyles): SerializedStyles => css`
    .author {
        address {
            line-height: 2.2rem;
            font-style: italic;

            a {
                text-decoration: none;
                font-weight: 500;
                font-style: normal;
            }
        }

        address, .follow, a {
            color: ${kicker};
        }

        time, .follow {
            ${sans}
        }

        time {
            font-size: 1.4rem;
            color: ${palette.neutral[46]};
        }
    }
`;

const ArticleBylineDarkStyles = ({ inverted }: PillarStyles): SerializedStyles => darkModeCss`
    background: ${palette.neutral.darkMode};
    color: ${palette.neutral[86]};

    .author {
        address, .follow, a {
            color: ${inverted};
        }

        time {
            color: ${palette.neutral[60]};
        }
    }
`;

interface ArticleBylineProps {
    byline?: string;
    pillarStyles: PillarStyles;
    publicationDate: string;
    contributors: Contributor[];
    imageSalt: string;
    className: SerializedStyles;
}

const ArticleByline = ({
    byline,
    pillarStyles,
    publicationDate,
    contributors,
    imageSalt,
    className,
}: ArticleBylineProps): JSX.Element =>
    <div
        css={[className, ArticleBylineStyles(pillarStyles), ArticleBylineDarkStyles(pillarStyles)]}
    >
        <div css={sidePadding}>
            <Avatar
                contributors={contributors}
                bgColour={pillarStyles.inverted}
                imageSalt={imageSalt}
            />
            <div className="author">
                { byline ? <address>{componentFromHtml(byline)}</address> : null }
                <time className="date">{ formatDate(new Date(publicationDate)) }</time>
                <Follow contributors={contributors} />
            </div>
        </div>
    </div>

export default ArticleByline;
