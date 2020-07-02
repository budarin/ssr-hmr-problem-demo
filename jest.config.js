module.exports = {
    displayName: 'ROOT',
    bail: 0,
    rootDir: './',
    globalSetup: '<rootDir>/config/jest/setup.js',
    coverageDirectory: 'coverage',
    notifyMode: 'failure-change',
    projects: ['src/client', 'src/common', 'src/server'],
    testPathIgnorePatterns: ['/node_modules/'],
};
