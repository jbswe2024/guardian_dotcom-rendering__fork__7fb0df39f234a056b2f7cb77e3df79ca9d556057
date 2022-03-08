import { AdRegion } from './region-classes';

type Config =
	| { isSticky: true }
	| {
			isSticky?: false;
			adRegion: AdRegion;
	  };

export type RTCParameters = {
	placementId: number;
};

/**
 * Determine the Placement ID that is used to look up a given stored bid request
 *
 * Stored bid requests are stored by the prebid server instance and each is
 * keyed by a placement ID. This placement ID corresponds to the tag id parameter
 * provided on the client
 *
 * @param adRegion The advertising region - different regions are covered by different
 * stored bid requests
 * @returns The placement id for an ad, depending on its ad region
 */
const getPlacementId = (config: Config): number => {
	if (config.isSticky) {
		return 9;
	}
	switch (config.adRegion) {
		case 'US':
			return 7;
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

export const getRTCParameters = (config: Config): RTCParameters => ({
	placementId: getPlacementId(config),
});
