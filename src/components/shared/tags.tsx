import React from 'react';
import { css, SerializedStyles } from '@emotion/core'
import { darkModeCss } from '../../styles';
import { textSans } from '@guardian/src-foundations/typography';
import { background, neutral } from '@guardian/src-foundations/palette';
import { remSpace } from '@guardian/src-foundations';
import { Design, Format } from '@guardian/types/Format';

interface TagsProps {
    tags: {
        webUrl: string;
        webTitle: string;
    }[];
    background?: string;
    format: Format;
}

const tagsStyles = (format: Format): SerializedStyles => {
    const backgroundColour = (format: Format) => {
        switch (format.design) {
            case Design.Comment:
                return neutral[86];
            case Design.Live:
                return neutral[93];
            default:
                return neutral[97];
        }
    };

    return css`
    margin-top: 0;
    margin-bottom: 0;

    display: block;
    list-style: none;
    padding: ${remSpace[2]} 0 ${remSpace[4]} 0;
    ${textSans.medium()}

    li {
        margin: ${remSpace[2]} ${remSpace[2]} 0 0;
        display: inline-block;

        a {
            text-decoration: none;
            white-space: nowrap;
            padding: 6px 16px;
            border-radius: 30px;
            text-overflow: ellipsis;
            max-width: 18.75rem;
            color: ${neutral[7]};
            background-color: ${backgroundColour(format)};
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`;
}

const tagsDarkStyles = darkModeCss`
    background: ${background.inverse};
    color: ${neutral[86]};

    li a {
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    }
`;

const Tags = ({ tags, format }: TagsProps): JSX.Element => (
    <ul css={[tagsStyles(format), tagsDarkStyles]}>
        {tags.map((tag, index) => {
            return <li key={index}>
                <a href={tag.webUrl}>
                    {tag.webTitle}
                </a>
            </li>
        })}
    </ul>
)

export default Tags;
