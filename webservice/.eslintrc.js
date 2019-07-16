module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        'plugin:@typescript-eslint/recommended', 
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
      "import"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len":  ["error", { "code": 120 }],
        '@typescript-eslint/explicit-function-return-type': [1, { allowExpressions: true }] 
    },
    "settings": {
        "import/resolver": {
            node: { 
                extensions: [
                    ".js",
                    ".ts",
                ]
            }
        }
    }
};