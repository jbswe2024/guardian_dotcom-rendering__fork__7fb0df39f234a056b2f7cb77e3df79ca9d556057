// ----- Imports ----- //

import React, { FC, ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { remSpace, breakpoints } from '@guardian/src-foundations';

import Image, { Props as ImageProps } from 'components/image';
import { Pillar, PillarStyles, getPillarStyles } from 'pillar';
import { darkModeCss } from 'styles';
import { Option } from 'types/option';

// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;


// ----- Component ----- //

interface Props {
    image: Omit<ImageProps, 'sizes'>;
    figcaption: Option<ReactNode>;
    pillar: Pillar;
}

const styles = css`
    margin: 1rem 0 ${remSpace[3]};

    ${from.wide} {
        margin-bottom: 1rem;
    }

    img {
        display: block;
        width: 100%;
    }
`;

const triangleStyles = ({ kicker, inverted }: PillarStyles): SerializedStyles => css`
    fill: ${kicker};
    height: 0.8em;
    padding-right: ${remSpace[1]};
    ${darkModeCss`
        fill: ${inverted};
    `}
`;

const captionStyles = css`
    ${textSans.xsmall()}
    padding-top: ${remSpace[2]};
    color: ${text.supporting};
`;

const BodyImage: FC<Props> = ({ figcaption, image, pillar }: Props) =>
    <figure css={styles}>
        <Image {...image} sizes={sizes} />
        {
            figcaption.fmap(caption =>
                <figcaption css={captionStyles}>
                    <svg
                        css={triangleStyles(getPillarStyles(pillar))}
                        viewBox="0 0 10 9"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon points="0,9 5,0 10,9 0,9" />
                    </svg>
                    {caption}
                </figcaption>
            )
        }
    </figure>


// ----- Exports ----- //

export default BodyImage;
