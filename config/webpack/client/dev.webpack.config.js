const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const ManifestPlugin = require('webpack-manifest-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

const babelConfig = require('../../babel/client.babel.config');
const cacheDir = path.resolve('node_modules/.cache');
const getThreadLoader = (name) => ({
    loader: 'thread-loader',
    options: {
        name,
    },
});
const includePaths = [path.resolve('./src/common'), path.resolve('./src/client')];

module.exports = {
    mode: 'development',
    watch: true,
    cache: true,
    target: 'web',
    profile: false,
    bail: true,
    devtool: 'source-map', // 'cheap-module-eval-source-map'
    entry: {
        client: ['react-hot-loader/patch', './src/client/index.tsx'],
    },
    output: {
        publicPath: '/',
        filename: 'client.js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist/client'),
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ['node_modules', 'src'],
        alias: { 'react-dom': '@hot-loader/react-dom' },
    },

    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx|json)$/,
                include: includePaths,
                exclude: /node_modules/,
                use: [
                    getThreadLoader('client-dev'),
                    {
                        loader: 'babel-loader',

                        options: Object.assign({}, babelConfig, {
                            babelrc: false,
                            cacheDirectory: path.resolve(cacheDir, 'client'),
                        }),
                    },
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx|json)$/,
                include: includePaths,
                exclude: /node_modules/,
                use: 'react-hot-loader/webpack',
            },

            {
                test: /\.css$/,
                include: includePaths,
                sideEffects: true,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(cacheDir, 'dev-client-css'),
                        },
                    },
                    {
                        loader: 'style-loader',
                        options: {},
                    },
                    {
                        loader: 'css-modules-typescript-loader',
                        options: {
                            mode: process.env.CI ? 'verify' : 'emit',
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[folder]-[name]-[local]',
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: './node_modules/react/umd/react.development.js' },
        //         { from: './node_modules/@hot-loader/react-dom/umd/react-dom.development.js' },
        //     ],
        // }),
        new ManifestPlugin({
            fileName: 'assets-manifest.json',
            writeToFileEmit: true,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),

        new webpack.DefinePlugin({
            __PROD__: false,
            __SERVER__: false,
            __CLIENT__: true,
        }),
        new UnusedFilesWebpackPlugin({
            failOnUnused: false,
            patterns: ['/src/client/**/*.*', '/src/common/**/*.*'],
            globOptions: {
                ignore: ['node_modules/**/*', 'src/**/__tests__/*.*', 'src/**/*.test.ts'],
            },
        }),
        // @ts-ignore
        new DuplicatesPlugin({
            emitErrors: false,
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
        }),
    ],
};
