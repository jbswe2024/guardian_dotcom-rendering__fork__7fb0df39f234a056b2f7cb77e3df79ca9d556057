import { css } from '@emotion/react';
import { headlineBold17 } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { decideTrail } from '../lib/decideTrail';
import { useAB } from '../lib/useAB';
import { useApi } from '../lib/useApi';
import { palette as themePalette } from '../palette';
import type { FETrailTabType } from '../types/trails';
import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
	margin-top: 24px;
	padding-bottom: 48px;
`;

// We only stick most viewed when ads are not showing. We do this
// to maximise right column space
const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const headingStyles = css`
	${headlineBold17}
	margin-bottom: 8px;
`;

interface Props {
	limitItems?: number;
	stickToTop?: boolean;
}

interface MostViewedRightPayloadType {
	tabs: FETrailTabType[];
}

export const MostViewedRight = ({
	limitItems = 5,
	stickToTop = false,
}: Props) => {
	type Variant =
		| 'deeply-read-only'
		| 'deeply-read-and-most-viewed'
		| 'most-viewed-only'
		| 'none';
	const useDeeplyReadTestVariant = (): Variant => {
		const ABTestAPI = useAB()?.api;
		if (ABTestAPI?.isUserInVariant('DeeplyReadTest', 'deeply-read-only')) {
			return 'deeply-read-only';
		} else if (
			ABTestAPI?.isUserInVariant(
				'DeeplyReadTest',
				'deeply-read-and-most-viewed',
			)
		) {
			return 'deeply-read-and-most-viewed';
		} else if (
			ABTestAPI?.isUserInVariant('DeeplyReadTest', 'most-viewed-only')
		) {
			return 'most-viewed-only';
		} else {
			return 'none';
		}
	};
	const testVariant = useDeeplyReadTestVariant();
	const endpointUrl =
		'https://api.nextgen.guardianapps.co.uk/most-read-with-deeply-read.json';
	const { data, error } = useApi<MostViewedRightPayloadType>(endpointUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(
			error,
			'most-viewed-deeply-read-right',
		);
		return null;
	}

	if (data) {
		const mostReadTrails = data.tabs[0]?.trails
			?.slice(0, limitItems)
			?.map(decideTrail);
		const deeplyReadTrails = data.tabs[1]?.trails
			?.slice(0, limitItems)
			?.map(decideTrail);

		return (
			<div
				css={[wrapperStyles, stickToTop && stickyStyles]}
				data-component="geo-most-popular"
			>
				{testVariant !== 'deeply-read-only' && (
					<>
						<StraightLines
							cssOverrides={css`
								display: block;
							`}
							count={4}
							color={themePalette('--straight-lines')}
						/>
						<h3 css={headingStyles}>Most viewed</h3>
						<ul data-link-name="Right hand most popular geo GB">
							{mostReadTrails?.map((trail, index) => (
								<MostViewedRightItem
									key={trail.url}
									trail={trail}
									mostViewedItemIndex={index}
								/>
							))}
						</ul>
					</>
				)}
				{(testVariant === 'deeply-read-only' ||
					testVariant === 'deeply-read-and-most-viewed') && (
					<>
						<StraightLines
							cssOverrides={css`
								display: block;
							`}
							count={4}
							color={themePalette('--straight-lines')}
						/>
						<h3 css={headingStyles}>Deeply read</h3>
						<ul data-link-name="Right hand deeply read">
							{deeplyReadTrails?.map((trail, index) => (
								<MostViewedRightItem
									key={trail.url}
									trail={trail}
									mostViewedItemIndex={index}
								/>
							))}
						</ul>
					</>
				)}
			</div>
		);
	}

	return null;
};
