"use strict";

const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        files: ["eslint.config.js", "src/**/*.js", "test/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs"
        },
        linterOptions: {
            reportUnusedDisableDirectives: "error"
        }
    }
];
