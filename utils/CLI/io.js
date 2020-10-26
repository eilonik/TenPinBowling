const readline = require("readline");
const {Colors} = require('../constants').IO;
const Consts = require('../constants').IO;
const parse = require('./parse');

const error = (msg) => {
    const padding = parse.prefix(msg.length);
    console.log(padding + Colors.ERROR + "%s" + Colors.RESET, "Error: " + msg);
}

const prompt = (msg, frame, padding, centerPadding) => {
    console.log();
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
    for (let row of msg) {
        console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, Consts.THEME_ELEMENT + " " + row + " " + centerPadding + Consts.THEME_ELEMENT);
    }
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
    console.log();
};

const message = (msg) => {
    let length;
    if (Array.isArray(msg)) {
        length = msg[0].length;
    } else {
        length = msg.length;
        msg = [msg];
    }
    const frame = parse.frame(length);
    const padding = parse.prefix(frame.length);
    const centerPadding = (length % 2) ? " " : "";
    prompt(msg, frame, padding, centerPadding);
}

const table = (rows, header = "") => {
    const titles = Object.keys(rows[0]);
    const maxLengthMap = {};
    // Create a map of maximum field lengths
    const padTitles = [];
    const readyRows = [];
    for (let title of titles) {
        let lengthMap = rows.map(el => el[title].toString().length);
        maxLengthMap[title] = Math.max(...lengthMap, title.length) + 1;
        padTitles.push(parse.pad(title, maxLengthMap[title])); 
    }

    const titlesRow = padTitles.join("|");
    readyRows.push(titlesRow);
    readyRows.push("=".repeat(titlesRow.length));
    for (const row of rows) {
        const currentRow = [];
        for (const title of titles) {
            currentRow.push(parse.pad(row[title].toString(), maxLengthMap[title])); 
        }
        readyRows.push(currentRow.join("|"));
    }
    if (header) {
        readyRows.unshift('-'.repeat(readyRows[0].length));
        readyRows.unshift(parse.pad(header, readyRows[0].length));
    }
    message(readyRows);
};

const createPrompt = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

const read = (question, cb) => {
    return new Promise((resolve) => {
        const channel = createPrompt();
        channel.setPrompt(Colors.PROMPT + question + " " + Consts.THEME_ELEMENT + " " + Colors.RESET);
        channel.prompt();
        channel.on('line', (input) => {
            input = parse.list(input);
            try {
                done = cb(input);
                channel.close();
                resolve();
            } catch (e) {
                error(e);
                channel.prompt();
            } 
        }); 
    });
};

module.exports.read = read;
module.exports.error = error;
module.exports.message = message;
module.exports.table = table;