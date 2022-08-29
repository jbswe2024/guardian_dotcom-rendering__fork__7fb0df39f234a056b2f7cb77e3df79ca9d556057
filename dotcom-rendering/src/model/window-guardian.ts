import type { ConfigType, ServerSideTests, Switches } from '../types/config';
import type { EditionId } from '../types/edition';
import type { DCRFrontType } from '../types/front';
import type { CAPIArticleType } from '../types/frontend';

export interface WindowGuardianConfig {
	isDotcomRendering: boolean;
	isDev: boolean;
	stage: StageType;
	frontendAssetsFullURL: string;
	page: {
		dcrCouldRender: boolean;
		contentType: string;
		edition: EditionId;
		revisionNumber: string;
		dcrSentryDsn: string;
		sentryHost: string;
		sentryPublicApiKey: string;
		keywordIds: string;
		dfpAccountId: string;
		adUnit: string;
		showRelatedContent: boolean;
		ajaxUrl: string;
		shouldHideReaderRevenue: boolean;
		googleRecaptchaSiteKey?: string;
		brazeApiKey?: string;
		isPaidContent?: boolean;
		isDev?: boolean;
	};
	libs: {
		googletag: string;
	};
	switches: Switches;
	tests: ServerSideTests;
	ophan: {
		pageViewId: string;
		browserId: string;
	};
}

interface WindowGuardianFrontConfig {
	isDotcomRendering: boolean;
	isDev: boolean;
	stage: StageType;
	frontendAssetsFullURL: string;
	page: {
		dcrCouldRender: boolean;
		contentType: string;
		edition: EditionId;
		revisionNumber: string;
		dcrSentryDsn: string;
		sentryHost: string;
		sentryPublicApiKey: string;
		keywordIds: string;
		dfpAccountId: string;
		adUnit: string;
		showRelatedContent: boolean;
		ajaxUrl: string;
		shouldHideReaderRevenue: boolean;
	};
	libs: {
		googletag: string;
	};
	switches: Switches;
	tests: ServerSideTests;
	ophan: {
		pageViewId: string;
		browserId: string;
	};
}

export const makeWindowGuardian = ({
	CAPIArticle,
	editionId,
	contentType,
	GAData,
	unknownConfig = {},
}: {
	CAPIArticle: CAPIArticleType;
	editionId: EditionId;
	contentType?: string;
	GAData: GADataType;
	/**
	 * In the case of articles we don't know the exact values that need to exist
	 * on the window.guardian.config.page property so rather than filter them we
	 * allow the entire object to be passed through here and we then extend it
	 * using Object.assigns
	 *
	 * This is obviously rubbish but has to be weighed against the risk of the
	 * commercial code failing because it depended on a property we removed
	 */
	unknownConfig?: ConfigType | object;
}): {
	// The 'config' attribute is derived from CAPIArticle and contains
	// all the data that, for legacy reasons, for instance compatibility
	// with the frontend commercial stack, or other scripts, we want to find
	// at window.guardian.config
	config: WindowGuardianConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
	GAData: GADataType;
} => {
	const { config } = CAPIArticle;
	return {
		config: {
			// This indicates to the client side code that we are running a dotcom-rendering rendered page.
			isDotcomRendering: true,
			isDev: process.env.NODE_ENV !== 'production',
			stage: config.stage,
			frontendAssetsFullURL: config.frontendAssetsFullURL,
			page: Object.assign(unknownConfig, {
				dcrCouldRender: true,
				contentType: contentType ?? '',
				edition: editionId,
				revisionNumber: config.revisionNumber,
				dcrSentryDsn:
					'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
				sentryPublicApiKey: config.sentryPublicApiKey,
				sentryHost: config.sentryHost,
				keywordIds: config.keywordIds,
				dfpAccountId: config.dfpAccountId,
				adUnit: config.adUnit,
				showRelatedContent: true,
				ajaxUrl: config.ajaxUrl,
				shouldHideReaderRevenue:
					config.shouldHideReaderRevenue ?? false,
				isPaidContent: config.isPaidContent ?? false,
			}),
			libs: {
				googletag: config.googletagUrl,
			},
			switches: config.switches,
			tests: config.abTests,
			ophan: {
				pageViewId: '',
				browserId: '',
			},
		},
		polyfilled: false,
		adBlockers: {
			active: undefined,
			onDetect: [],
		},
		modules: {
			sentry: {
				reportError: () => null,
			},
		},
		GAData: GAData,
	};
};

const makeFrontWindowGuardianConfig = ({
	config,
	editionId,
}: DCRFrontType): WindowGuardianFrontConfig => {
	return {
		// This indicates to the client side code that we are running a dotcom-rendering rendered page.
		isDotcomRendering: true,
		isDev: process.env.NODE_ENV !== 'production',
		stage: config.stage,
		frontendAssetsFullURL: config.frontendAssetsFullURL,
		page: {
			dcrCouldRender: true,
			contentType: 'TODO: Do we need this?',
			edition: editionId,
			revisionNumber: config.revisionNumber,
			dcrSentryDsn:
				'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
			sentryPublicApiKey: config.sentryPublicApiKey,
			sentryHost: config.sentryHost,
			keywordIds: config.keywordIds,
			dfpAccountId: config.dfpAccountId,
			adUnit: config.adUnit,
			showRelatedContent: true,
			ajaxUrl: config.ajaxUrl,
			shouldHideReaderRevenue: false, // TODO Pass this in
		},
		libs: {
			googletag: config.googletagUrl,
		},
		switches: config.switches,
		tests: config.abTests,
		ophan: {
			pageViewId: '',
			browserId: '',
		},
	};
};

export const makeFrontWindowGuardian = (
	front: DCRFrontType,
): {
	// The 'config' attribute is derived from CAPIArticle and contains
	// all the data that, for legacy reasons, for instance compatibility
	// with the frontend commercial stack, or other scripts, we want to find
	// at window.guardian.config
	config: WindowGuardianFrontConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
} => {
	return {
		config: makeFrontWindowGuardianConfig(front),
		polyfilled: false,
		adBlockers: {
			active: undefined,
			onDetect: [],
		},
		modules: {
			sentry: {
				reportError: () => null,
			},
		},
	};
};
