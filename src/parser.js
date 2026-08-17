"use strict";

const DIGIT_SYNTAX_PATTERN = /^\$(\d+)\$\{([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*)\}/;

function parseDigitSyntax(source, start = 0) {
    if (
        typeof source !== "string" ||
        !Number.isInteger(start) ||
        start < 0 ||
        start >= source.length
    ) {
        return null;
    }

    const match = DIGIT_SYNTAX_PATTERN.exec(source.slice(start));

    if (match === null) {
        return null;
    }

    return {
        raw: match[0],
        number: match[1],
        locale: match[2],
        length: match[0].length
    };
}

module.exports = parseDigitSyntax;
