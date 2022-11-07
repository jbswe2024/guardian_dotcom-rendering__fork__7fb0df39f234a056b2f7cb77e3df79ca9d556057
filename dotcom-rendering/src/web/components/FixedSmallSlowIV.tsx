import type {
	DCRContainerPalette,
	DCRSupportingContent,
} from '../../types/front';
import type { TrailType } from '../../types/trails';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

type Props = {
	trails: TrailType[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	supportingContent?: DCRSupportingContent[] | undefined;
};

export const FixedSmallSlowIV = ({
	trails,
	containerPalette,
	showAge,
	supportingContent,
}: Props) => {
	const slicedTrails = trails.slice(0, 4);

	return (
		<UL direction="row">
			{slicedTrails.map((trail, index) => {
				return (
					<LI key={trail.url} padSides={true} showDivider={index > 0}>
						<FrontCard
							trail={trail}
							starRating={trail.starRating}
							containerPalette={containerPalette}
							showAge={showAge}
							supportingContent={supportingContent}
							imageSize="medium"
						/>
					</LI>
				);
			})}
		</UL>
	);
};
