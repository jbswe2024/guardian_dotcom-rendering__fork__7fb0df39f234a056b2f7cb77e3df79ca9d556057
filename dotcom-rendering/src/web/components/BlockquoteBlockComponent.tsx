import { css, ClassNames } from '@emotion/react';

import { body } from '@guardian/source-foundations';
import { unwrapHtml } from '../../model/unwrapHtml';
import { RewrappedComponent } from './RewrappedComponent';
import { QuoteIcon } from './QuoteIcon';

type Props = {
	html: string;
	palette: Palette;
	quoted?: boolean;
};

const BlockquoteRow = ({ children }: { children: React.ReactNode }) => (
	<blockquote
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</blockquote>
);

export const BlockquoteBlockComponent: React.FC<Props> = ({
	html,
	palette,
	quoted,
}: Props) => (
	<ClassNames>
		{({ css: _css }) => {
			const baseBlockquoteStyles = _css`
			margin-bottom: 16px;
			${body.medium()};
			font-style: italic;
		`;

			const simpleBlockquoteStyles = _css`
			${baseBlockquoteStyles}
			margin-top: 16px;
			margin-right: 0;
			margin-bottom: 16px;
			margin-left: 33px;
		`;

			const quotedBlockquoteStyles = _css`
			${baseBlockquoteStyles}
			color: ${palette.text.blockquote};
		`;

			const {
				willUnwrap: isUnwrapped,
				unwrappedHtml,
				unwrappedElement,
			} = unwrapHtml({
				fixes: [
					{ prefix: '<p>', suffix: '</p>', unwrappedElement: 'p' },
					{
						prefix: '<blockquote>',
						suffix: '</blockquote>',
						unwrappedElement: 'blockquote',
					},
					{
						prefix: '<blockquote class="quoted">',
						suffix: '</blockquote>',
						unwrappedElement: 'div',
					},
				],
				html,
			});

			if (quoted) {
				return (
					<BlockquoteRow>
						<QuoteIcon
							colour={palette.fill.blockquoteIcon}
							size="medium"
						/>
						<RewrappedComponent
							isUnwrapped={isUnwrapped}
							html={unwrappedHtml}
							elCss={quotedBlockquoteStyles}
							tagName={unwrappedElement}
						/>
					</BlockquoteRow>
				);
			}
			return (
				<RewrappedComponent
					isUnwrapped={isUnwrapped}
					html={unwrappedHtml}
					elCss={simpleBlockquoteStyles}
					tagName={unwrappedElement}
				/>
			);
		}}
	</ClassNames>
);
