module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
          "modules": true,
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "no-duplicate-imports": 2,
      "indent": ["error", 2, { "SwitchCase": 1 }],
      // treat as errors(1st param) if line linght > 160 (2nd param), each tab counted as 2 chars (3rd param)
      "max-len": [0, 160, 2],
      // relax comments
      "require-jsdoc": [0],
      "space-before-function-paren": 0,
      // allow async-await
      "generator-star-spacing": 0,
      // allow debugger during development (to warn)
      "no-debugger": 1,
      // relax naming (to warn) for now
      "camelcase": 1,
      "jsx-quotes": [2, "prefer-double"],
      "no-invalid-this": "off",
      "object-curly-spacing": ["error", "always"],
      "object-shorthand": ["error", "always"],
      "padded-blocks": ["error", "never"],
      "prefer-const": 2,
      "react/destructuring-assignment": ["error", "always"],
      "react/jsx-boolean-value": 2,
      "react/jsx-indent": [2, 2],
      "react/jsx-indent-props": [2, 2],
      "react/jsx-tag-spacing": [2, {
        "afterOpening": "never",
        "beforeClosing": "never",
        "beforeSelfClosing": "allow",
        "closingSlash": "never"
      }],
      "react/jsx-no-target-blank": 0,
      "react/no-unused-prop-types": 2,
      "react/prop-types": 2,
      "space-infix-ops": 1
    }
};