const path = require('path');
const webpack = require('webpack');

// Generate dynamic Card and Layout stories
require('../../dotcom-rendering/scripts/gen-stories/gen-stories');

/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
	core: {
		builder: 'webpack5',
	},
	features: {
		buildStoriesJson: true,
	},
	refs: () => ({
		'common-rendering': {
			title: 'common-rendering',
			url: 'http://localhost:4001',
		},
		'dotcom-rendering': {
			title: 'dotcom-rendering',
			url: 'http://localhost:4002',
		},
	}),
	stories: ['../../apps-rendering/src/**/*.stories.@(js|mdx|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'storybook-addon-turbo-build',
		'@storybook/addon-knobs',
		{
			name: 'storybook-addon-turbo-build',
			options: {
				optimizationLevel: 1,
				// We're explicitly setting the minification options below because
				// we want to turn off `minifyIdentifiers`. Why? Because it breaks
				// Islands hydration. When you minify the component filenames
				// the dynamic imports fail to find them.
				// See: https://github.com/privatenumber/esbuild-loader#minify
				//    & https://esbuild.github.io/api/#minify
				esbuildMinifyOptions: {
					target: 'es2015',
					minify: false,
					minifyWhitespace: true,
					minifyIdentifiers: false,
					minifySyntax: true,
				},
			},
		},
	],
	webpackFinal: async (config) => {
		// Get project specific webpack options
		config = arWebpack(config);

		// Global options for webpack
		config.resolve.extensions.push('.ts', '.tsx');

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		config.plugins.push(
			new webpack.DefinePlugin({
				process: '{}',
			}),
		);

		return config;
	},
	env: (config) => ({
		...config,
		// Github sets a CI env var for all actions but this isn't being picked up by Storybook
		// See: https://storybook.js.org/docs/react/configure/environment-variables
		CI: 'true',
	}),
};

const arWebpack = (config) => {
	const rules = config.module.rules;

	rules.push({
		test: /\.tsx?$/,
		include: [
			path.resolve(__dirname, '../../apps-rendering'),
			path.resolve(__dirname, '../../common-rendering'),
		],
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								// Babel recommends installing corejs as a peer dependency
								// and specifying the version used here
								// https://babeljs.io/docs/en/babel-preset-env#usebuiltins
								// This should automatically inject polyfills as needed,
								// based on our code and the browserslist in package.json
								useBuiltIns: 'usage',
								corejs: 3,
								modules: false,
								targets: { esmodules: true },
							},
						],
					],
				},
			},
			{
				loader: 'ts-loader',
				options: {
					configFile: 'apps-rendering/config/tsconfig.client.json',
				},
			},
		],
	});

	config.resolve.modules = [
		...((config && config.resolve && config.resolve.modules) || []),
		path.resolve(__dirname, '../../apps-rendering/src'),
		path.resolve(__dirname, '../../common-rendering/src'),
	];

	config.resolve.alias = {
		...config.resolve.alias,
		logger: path.resolve(
			__dirname,
			`../../apps-rendering/src/logger/clientDev`,
		),
		Buffer: 'buffer',
	};

	return config;
};
