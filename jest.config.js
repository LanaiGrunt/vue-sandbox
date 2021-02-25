module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        '^.+\\.vue$': 'vue-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,js,vue}',
        '!src/main.ts',
        '!src/registerServiceWorker.ts',
        '!**/node_modules/**',
    ],
};
