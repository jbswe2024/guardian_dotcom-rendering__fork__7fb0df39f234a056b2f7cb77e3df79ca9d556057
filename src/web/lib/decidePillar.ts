import { Design, Pillar, Special } from '@guardian/types';

export const decidePillar = ({
	pillar,
	design,
}: {
	pillar: CAPIPillar;
	design?: Design;
}): Theme => {
	// We override the pillar to be opinion on Comment news pieces
	if (design === Design.Comment && pillar === 'news') return Pillar.Opinion;
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'sport':
			return Pillar.Sport;
		case 'culture':
			return Pillar.Culture;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Special.Labs;
		default:
			return Pillar.News;
	}
};
