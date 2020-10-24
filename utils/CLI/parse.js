
const Consts = require('../constants');
const list = (input) => {
    if (!input) {
        return [];
    }
    return input.toString().split(",").map(el => el.replace(/\s/g, ''));
};

const pad = (str, pad) => {
    const paddingPrefix = str.length + Math.ceil((pad - str.length) / 2);
    const paddingSuffix = pad;
    return str.padStart(paddingPrefix, " ").padEnd(paddingSuffix, " ")
}

const prefix = (length) => {
    return " ".repeat(Math.max((process.stdout.columns - length) / 2, 0));
}

const frame = (length) => {
    const frameLength = Math.ceil(length / 2) + 3; 
    return new Array(frameLength).fill(Consts.IO.THEME_ELEMENT).join("");
};

module.exports.list = list;
module.exports.pad = pad;
module.exports.prefix = prefix;
module.exports.frame = frame;