module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'indent': ['error', 4, { SwitchCase: 1 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'object-curly-spacing': ['error', 'always'],
        'quote-props': ['error', 'consistent-as-needed'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'spaced-comment': ['error', 'always', {
            exceptions: ['-', '+'],
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: 5,
            multiline: {
                max: 1,
                allowFirstLine: false,
            },
        }],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
        }],
    },
    overrides: [
        {
            files: [
                '*.vue',
            ],
            rules: {
                indent: 'off',
            },
        },
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
