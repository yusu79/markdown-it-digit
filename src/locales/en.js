"use strict";

function formatEnglish(number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = formatEnglish;
