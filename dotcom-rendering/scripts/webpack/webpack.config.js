/* eslint-disable global-require -- we merge configs in the export */
// @ts-check
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const { merge } = require('webpack-merge');
const WebpackMessages = require('webpack-messages');
const { BUILD_VARIANT } = require('./bundles');

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const BUILD_APPS = process.env.BUILD_APPS === 'true';
const dist = path.resolve(__dirname, '..', '..', 'dist');

const sessionId = uuidv4();

let builds = 0;

/**
 * @param {{ platform: 'server' | 'browser.legacy' | 'browser.modern' | 'browser.variant' | 'browser.apps'}} options
 * @returns {import('webpack').Configuration}
 */
const commonConfigs = ({ platform }) => ({
	name: platform,
	mode: DEV ? 'development' : 'production',
	output: {
		path: dist,
	},
	stats: DEV ? 'errors-only' : 'normal',
	devtool:
		process.env.NODE_ENV === 'production'
			? 'source-map'
			: 'eval-cheap-module-source-map',
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
		symlinks: false,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
		}),
		// @ts-expect-error -- somehow the type declaration isn’t playing nice
		new FilterWarningsPlugin({
			exclude: /export .* was not found in/,
		}),
		// Matching modules specified in this regex will not be imported during the webpack build
		// We use this if there are optional dependencies (e.g in jsdom, ws) to remove uneccesary warnings in our builds / console outpouts.
		new webpack.IgnorePlugin({
			resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
		}),
		...(DEV
			? // DEV plugins
			  [
					// @ts-expect-error -- somehow the type declaration isn’t playing nice
					new WebpackMessages({
						name: platform,
						/** @type {(message: string) => void} */
						logger: (message) => {
							// distinguish between initial and subsequent (re)builds in console output
							if (builds < module.exports.length * 2) {
								message = message
									.replace('Building', 'Building initial')
									.replace('Completed', 'Completed initial');
							} else {
								message = message.replace(
									'Building',
									'Rebuilding',
								);
							}
							console.log(message);
							builds += 1;
						},
					}),
			  ]
			: // PROD plugins
			  [
					new BundleAnalyzerPlugin({
						reportFilename: path.join(
							dist,
							`${platform}-bundles.html`,
						),
						analyzerMode: 'static',
						openAnalyzer: false,
						logLevel: 'warn',
					}),
			  ]),
	],
	infrastructureLogging: {
		level: PROD ? 'info' : 'warn',
	},
});

module.exports = [
	merge(
		commonConfigs({
			platform: 'server',
		}),
		require(`./webpack.config.server`)({ sessionId }),
		DEV ? require(`./webpack.config.dev-server`) : {},
	),
	merge(
		commonConfigs({
			platform: 'browser.modern',
		}),
		require(`./webpack.config.browser`)({
			bundle: 'modern',
			sessionId,
		}),
	),
	// TODO: ignore static files for legacy compilation
	...(INCLUDE_LEGACY
		? [
				merge(
					commonConfigs({
						platform: 'browser.legacy',
					}),
					require(`./webpack.config.browser`)({
						bundle: 'legacy',
						sessionId,
					}),
				),
		  ]
		: []),
	...(PROD || BUILD_APPS
		? [
				merge(
					commonConfigs({
						platform: 'browser.apps',
					}),
					require(`./webpack.config.browser`)({
						bundle: 'apps',
						sessionId,
					}),
				),
		  ]
		: []),
	// Only build the variant if in production mode
	// Use `make build` or remove the PROD check temporarily to build the variant in development
	...(PROD && BUILD_VARIANT
		? [
				merge(
					commonConfigs({
						platform: 'browser.variant',
					}),
					require(`./webpack.config.browser`)({
						bundle: 'variant',
						sessionId,
					}),
				),
		  ]
		: []),
];
