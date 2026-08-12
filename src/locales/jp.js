"use strict";

const JAPANESE_UNITS = [
    "万",
    "億",
    "兆",
    "京",
    "垓",
    "𥝱",
    "穣",
    "溝",
    "澗",
    "正",
    "載",
    "極",
    "恒河沙",
    "阿僧祇",
    "那由他",
    "不可思議",
    "無量大数"
];

function formatJapanese(number) {
    const lowerDigits = number.slice(-JAPANESE_UNITS.length * 4);
    const upperDigits = number.slice(0, -JAPANESE_UNITS.length * 4);
    const groups = lowerDigits.match(/\d{1,4}(?=(?:\d{4})*$)/g);
    const parts = [];

    if (upperDigits !== "") {
        parts.push(upperDigits, `<sub>${JAPANESE_UNITS.at(-1)}</sub>`);
    }

    for (const [index, group] of groups.entries()) {
        const unitIndex = groups.length - index - 2;

        parts.push(group);

        if (unitIndex >= 0) {
            parts.push(`<sub>${JAPANESE_UNITS[unitIndex]}</sub>`);
        }
    }

    return parts.join("");
}

module.exports = formatJapanese;
