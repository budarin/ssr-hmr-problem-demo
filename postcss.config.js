const path = require('path');

const config = {
    plugins: [
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
            },
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        require('cssnano')({
            preset: 'advanced',
        }),
    );
}

module.exports = config;
