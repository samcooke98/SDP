const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: [
		'babel-polyfill',
		'webpack/hot/poll?1000',
		'./src/server/index.js',

	],
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: path.resolve(__dirname, "build")
	},
	target: 'node',
	externals: [nodeExternals({
		whitelist: [
			'webpack/hot/poll?1000',
			/^react-toolbox/, //Regex actually works, strings didn't seem to be 
			/^react-css-themr/,
			/^react-icons/,
			/^loaders.css/
		]
	}), "./src/server/app.js"],
	node: {
		__dirname: false
	},
	watch: true,
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					// 'isomorphic-style-loader?sourceMap',
					// 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
					"isomorphic-style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							sourceMap: true,
							importLoaders: 1,
							localIdentName: "[name]--[local]--[hash:base64:8]"
						}
					},
					"postcss-loader" // has separate config, see postcss.config.js nearby
				]
			}
		]
	},
	plugins: [
		new StartServerPlugin('server.js'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// new CleanWebpackPlugin(path.resolve(__dirname, "build")),
		new webpack.DefinePlugin({
			'process.env.REACT_SPINKIT_NO_STYLES': true,
		}),
		

	]
};



/* 
Prevent FOUC	
https://github.com/kriasoft/isomorphic-style-loader/issues/62
https://medium.com/@mattvagni/server-side-rendering-with-css-modules-6b02f1238eb1 
https://github.com/gajus/react-css-modules

*/