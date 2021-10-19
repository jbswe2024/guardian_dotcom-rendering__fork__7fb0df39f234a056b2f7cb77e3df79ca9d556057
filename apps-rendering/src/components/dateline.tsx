// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { Design, map, Pillar, withDefault } from '@guardian/types';
import type { Format, Option } from '@guardian/types';
import { formatDate } from 'date';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';
import { darkModeCss as darkMode } from 'styles';

// ----- Component ----- //

interface Props {
	date: Option<Date>;
	format: Format;
}

const darkStyles = darkMode`
    color: ${neutral[60]};
`;

const styles = css`
	${textSans.xsmall()}
	color: ${text.supporting};

	${darkStyles}
`;

const commentDatelineStyles = css`
	${textSans.xsmall()}
	color: ${neutral[20]};

	${darkStyles}
`;

const liveblogDatelineStyles = css`
	${styles}
	color: ${neutral[100]};

	${darkMode`
    	color: ${neutral[93]};
	`}

	${from.tablet} {
		${from.mobileLandscape} {
			color: ${neutral[20]};
		}
	}
`;

const getDatelineStyles = (format: Format): SerializedStyles => {
	switch (format.design) {
		case Design.LiveBlog:
			return liveblogDatelineStyles;
		default:
			switch (format.theme) {
				case Pillar.Opinion:
					return commentDatelineStyles;
				default:
					return styles;
			}
	}
};

const Dateline: FC<Props> = ({ date, format }) =>
	pipe(
		date,
		map((d) => (
			<time
				css={getDatelineStyles(format)}
				data-date={d}
				className="date js-date"
			>
				{formatDate(d)}
			</time>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Dateline;
