const
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	merge = require('webpack-merge'),
	path = require('path'),

	ExtractTextPlugin = require('extract-text-webpack-plugin'),

	COMMON = {
		mode: 'production',
		stats: {
			modules: false,
			children: false
		}
	},
	JAVASCRIPT = {
		entry: './static/js/index.js',
		output: {
			filename: 'validator.min.js',
			path: path.resolve(__dirname, 'djangocms_validator', 'static', 'djangocms_validator'),
			library: 'CMSValidator',
			libraryTarget: 'global'
		},
		module: {
			rules: [{
				test: /\.js$/,
				use: [{loader: 'babel-loader'}]
			}]
		}
	},
	STYLESHEET = {
		entry: './static/scss/validator.scss',
		output: {
			filename: 'validator.min.css',
			path: path.resolve(__dirname, 'djangocms_validator', 'static', 'djangocms_validator')
		},
		module: {
				rules: [{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({use: [
						{loader: 'css-loader'},
						{loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [autoprefixer, cssnano]
							}
						},
						{loader: 'sass-loader'}
					]})
				}]
			},
			plugins: [
				new ExtractTextPlugin({
					filename: 'validator.min.css',
					allChunks: true
				})
			]
	}
;


module.exports = [
	merge(COMMON, JAVASCRIPT),
	merge(COMMON, STYLESHEET)
];
