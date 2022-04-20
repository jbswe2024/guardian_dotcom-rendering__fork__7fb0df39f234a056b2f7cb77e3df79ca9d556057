// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import { body, remSpace, textSans } from '@guardian/source-foundations';
import type { FC, ReactNode } from 'react';

// ----- Component ----- //

interface Props {
	children?: ReactNode;
	format: ArticleFormat;
	dropCapStyles?: SerializedStyles;
}

const styles = (theme: ArticleTheme): SerializedStyles => {
	const labs = theme === ArticleSpecial.Labs ? textSans.medium() : null;

	return css`
		${body.medium()}
		overflow-wrap: break-word;
		margin: 0 0 ${remSpace[3]};

		${labs}
	`;
};

const Paragraph: FC<Props> = ({ children, format, dropCapStyles }: Props) => (
	<p css={[styles(format.theme), dropCapStyles]}>{children}</p>
);

// ----- Exports ----- //

export default Paragraph;
