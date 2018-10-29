const path = require('path');
const webpack = require('webpack');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./base');


const getEnvVars = () => {
	return {
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('local'),
			'BROWSER': JSON.stringify(true)
		}
	};
};

const config = {
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin(getEnvVars()),
       /* new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),*/
        new HtmlWebpackPlugin()
    ],
    /*module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },*/
    devtool: "source-map"
};

module.exports = merge(baseConfig, config);
