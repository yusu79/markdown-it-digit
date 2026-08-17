"use strict";

function createEastAsianFormatter(units) {
    return (number) => {
        const lowerDigits = number.slice(-units.length * 4);
        const upperDigits = number.slice(0, -units.length * 4);
        const groups = lowerDigits.match(/\d{1,4}(?=(?:\d{4})*$)/g);
        const parts = [];

        if (upperDigits !== "") {
            parts.push(upperDigits, `<sub>${units.at(-1)}</sub>`);
        }

        for (const [index, group] of groups.entries()) {
            const unitIndex = groups.length - index - 2;

            parts.push(group);

            if (unitIndex >= 0) {
                parts.push(`<sub>${units[unitIndex]}</sub>`);
            }
        }

        return parts.join("");
    };
}

module.exports = createEastAsianFormatter;
