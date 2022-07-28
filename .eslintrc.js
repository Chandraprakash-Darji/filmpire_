module.exports = {
    parser: "babel-eslint",
    extends: ["plugin:react/recommended"],
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    plugins: ["react"],
    rules: {
        "import/no-cycle": 0,
        "no-console": 0,
        "react/prop-types": 0,
        "linebreak-style": 0,
        "react/state-in-constructor": 0,
        "import/prefer-default-export": 0,
        "max-len": [2, 250],
        "object-curly-newline": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-one-expression-per-line": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/alt-text": 0,
        "jsx-a11y/no-autofocus": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/no-array-index-key": 0,
        "no-param-reassign": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-props-no-spreading": 0,
        "no-sparse-arrays": 0,
        "no-array-index-key": 0,
        camelcase: 0,
    },
};
