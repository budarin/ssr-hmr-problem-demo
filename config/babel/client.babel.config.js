const isTesting = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    comments: false,
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: false,
                modules: isTesting ? 'commonjs' : false,
                corejs: {
                    version: 3,
                    proposals: true,
                },
                useBuiltIns: 'usage',
                targets: isDev ? 'last 1 chrome version' : 'last 2 chrome version',
            },
        ],
        [
            '@babel/preset-react',
            {
                development: process.env.NODE_ENV === 'development',
                useBuiltIns: true,
            },
        ],
        '@babel/typescript',
    ],
    plugins: [],
    env: {
        production: {
            presets: ['minify'],
            plugins: [
                'babel-plugin-react-local',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
            ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
        },
        development: {
            plugins: ['react-hot-loader/babel', '@babel/plugin-transform-react-jsx-self'],
            ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__', '__tests__'],
        },
        test: {
            ignore: ['__snapshots__'],
        },
    },
};
