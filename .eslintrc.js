module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "commonjs": true
  },
  "extends": ["airbnb"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "indent": [2, 2],
    "react/jsx-indent": [2, 2],
    "react/react-in-jsx-scope": "off",
    "no-extra-semi": 0,
    "semi": ['error', 'always'],
    "quotes": ['error', 'single'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": [0],
    "react/require-default-props": [0],
    "arrow-body-style": [0],
    "no-param-reassign": [0],
    "react/prop-types": [0],
    "react/jsx-props-no-spreading": [0],
    "no-console": process.env.NODE_ENV === "production" ? ["error", { allow: ["warn", "error"] }] : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-extraneous-dependencies": "warn",
    "import/order": [2],
    "import/prefer-default-export": [0],
    "import/no-unresolved": [0],
    "jsx-a11y/media-has-caption": "off",
    "no-nested-ternary": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-static-element-interactions": [0]
  }
};
