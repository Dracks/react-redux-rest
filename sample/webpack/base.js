//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const tsImportPluginFactory = require('ts-import-plugin')

const VENDOR_LIBS = require('./vendor_libs');

module.exports = {
    entry:{
        bundle: ["@babel/polyfill", './src/index.tsx'],
        vendor: VENDOR_LIBS,
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/react",
                            '@babel/typescript',
                            ['@babel/env', { targets: { browsers: ['last 2 versions'] }}]
                        ]
                    }
                },
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/
            },
        ]
    },
    optimization: {
        splitChunks:{
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    }
};
