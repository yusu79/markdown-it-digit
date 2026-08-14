"use strict";

function formatIndian(number) {
    if (number.length <= 3) {
        return number;
    }

    const leadingDigits = number.slice(0, -3);
    const trailingDigits = number.slice(-3);
    const formattedLeadingDigits = leadingDigits.replace(
        /\B(?=(\d{2})+(?!\d))/g,
        ","
    );

    return `${formattedLeadingDigits},${trailingDigits}`;
}

module.exports = formatIndian;
