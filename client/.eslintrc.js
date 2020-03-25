module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-useless-constructor': 'off',
    'vue/html-indent': [
        'warn',
        4,
        {
            alignAttributesVertically: false,
        },
    ],
    'vue/html-self-closing': [
        'warn',
        {
            html: {
                void: 'always',
                normal: 'always',
                component: 'always',
            },
            svg: 'always',
            math: 'always',
        },
    ],
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/attributes-order': 'off',
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            varsIgnorePattern: '_',
        },
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['off'],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/interface-name-prefix': [
        'error',
        { prefixWithI: 'always' },
    ],
    '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
        },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/triple-slash-reference': [
        'error',
        {
            path: 'never',
            types: 'never',
            lib: 'never',
        },
    ],
    '@typescript-eslint/no-use-before-declare': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/consistent-type-definitions': [
        'error',
        'interface',
    ],
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    // Off as it doesn't allow multiline arrow functions with bracketed returns
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'always'],
    complexity: 'off',
    'constructor-super': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'eol-last': 'error',
    'guard-for-in': 'error',
    'max-classes-per-file': ['error', 1],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': [
        'error',
        {
            allow: ['warn', 'error', 'trace', 'group', 'groupEnd'],
        },
    ],
    'no-debugger': 'error',
    'no-empty': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': 'off',
    'prefer-const': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'radix': 'error',
    'space-before-function-paren': [
        // TODO: Change to error once functions in generics are not taken
        'off',
        {
            anonymous: 'always',
            asyncArrow: 'always',
            named: 'never',
        },
    ],
    'use-isnan': 'error',
    'valid-typeof': 'off',
    'comma-dangle': ['error', 'only-multiline'],
  }
}
