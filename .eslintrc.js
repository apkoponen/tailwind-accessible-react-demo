"use strict";

// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["import", "react", "react-hooks"],
  extends: [
    "plugin:jsx-a11y/recommended", // Sane defaults for jsx a11y
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:tailwind/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Next.js links do not have href
    "jsx-a11y/anchor-is-valid": "off",

    "no-return-await": "error",

    "@typescript-eslint/explicit-function-return-type": "off",

    "import/order": ["error"],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],

    // From here on based on eslint-config-react-app

    // http://eslint.org/docs/rules/
    "array-callback-return": "error",
    "dot-location": ["error", "property"],
    eqeqeq: ["error", "smart"],
    "new-parens": "error",
    "no-caller": "error",
    "no-cond-assign": ["error", "except-parens"],
    "no-const-assign": "error",
    "no-control-regex": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty-character-class": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error",
    "no-implied-eval": "error",
    "no-invalid-regexp": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": ["error", { allowLoop: true, allowSwitch: false }],
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-mixed-operators": [
      "error",
      {
        groups: [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        allowSamePrecedence: false,
      },
    ],
    "no-multi-str": "error",
    "no-native-reassign": "error",
    "no-negated-in-lhs": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-regex-spaces": "error",
    "no-restricted-syntax": ["error", "WithStatement"],
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-labels": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-rename": [
      "error",
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    "no-with": "error",
    "no-whitespace-before-property": "error",
    "react-hooks/exhaustive-deps": "error",
    "require-yield": "error",
    "rest-spread-spacing": ["error", "never"],
    strict: ["error", "never"],
    "unicode-bom": ["error", "never"],
    "use-isnan": "error",
    "valid-typeof": "error",
    "no-restricted-properties": [
      "error",
      {
        object: "require",
        property: "ensure",
        message:
          "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
      },
      {
        object: "System",
        property: "import",
        message:
          "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
      },
    ],
    "getter-return": "error",

    // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
    "default-case": "off",
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
    "no-dupe-class-members": "off",
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
    "no-undef": "off",

    // Add TypeScript specific rules (and turn off ESLint equivalents)
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-namespace": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/interface-name-prefix": "off",

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-webpack-loader-syntax": "error",

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    "react/forbid-foreign-prop-types": ["error", { allowInPropTypes: true }],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-pascal-case": [
      "error",
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-danger-with-children": "error",
    // Disabled because of undesirable warnings
    // See https://github.com/facebook/create-react-app/issues/5204 for
    // blockers until its re-enabled
    // 'react/no-deprecated': 'error',
    "react/no-direct-mutation-state": "error",
    "react/no-is-mounted": "error",
    "react/no-typos": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-boolean-value": "error",
    "react/require-render-return": "error",
    "react/style-prop-object": "error",

    // https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
    "react-hooks/rules-of-hooks": "error",
  },
  settings: {
    "import/core-modules": ["styled-jsx", "styled-jsx/css"],
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
