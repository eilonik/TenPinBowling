const readline = require("readline");
const {Colors, Consts} = require('../constants').IO;

const processInput = (input) => {
    if (!input) {
        return [];
    }
    return input.toString().split(",").map(el => el.replace(/\s/g, ''));
};

const centeredMessagePrefix = (length) => {
return " ".repeat(Math.max((process.stdout.columns - length) / 2, 0));
}

const greeting = () => {
    const rows = [
        "   #     ###       ######  ### #     #     ######  ####### #     # #       ### #     #  #####   ",
        "  ##    #   #      #     #  #  ##    #     #     # #     # #  #  # #        #  ##    # #     #  ",
        " # #   #     #     #     #  #  # #   #     #     # #     # #  #  # #        #  # #   # #        ",
        "   #   #     #     ######   #  #  #  #     ######  #     # #  #  # #        #  #  #  # #  ####  ",
        "   #   #     #     #        #  #   # #     #     # #     # #  #  # #        #  #   # # #     #  ",
        "   #    #   #      #        #  #    ##     #     # #     # #  #  # #        #  #    ## #     #  ",
        " #####   ###       #       ### #     #     ######  #######  ## ##  ####### ### #     #  #####   "
    ];
    message(rows);
    return;
};

const error = (msg) => {
    const padding = centeredMessagePrefix(msg.length);
    console.log(padding + Colors.ERROR + "%s" + Colors.RESET, msg);
}

const message = (msg) => {
    let length;
    if (Array.isArray(msg)) {
        length = msg[0].length;
    } else {
        length = msg.length;
        msg = [msg];
    }
    const frameLength = Math.ceil(length / 2) + 3;
    const centerPadding = (length % 2) ? " " : ""; 
    const frame = new Array(frameLength).fill(Consts.THEME_ELEMENT).join("");
    const padding = centeredMessagePrefix(frame.length);
    console.log();
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
    for (let row of msg) {
        console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, Consts.THEME_ELEMENT + " " + row + " " + centerPadding + Consts.THEME_ELEMENT);
    }
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
    console.log();
}

const padString = (str, pad) => {
    const paddingPrefix = str.length + Math.ceil((pad - str.length) / 2);
    const paddingSuffix = pad;
    return str.padStart(paddingPrefix, " ").padEnd(paddingSuffix, " ")
}

const table = (rows, title = "") => {
    const titles = Object.keys(rows[0]);
    const maxLengthMap = {};
    // Create a map of maximum field lengths
    const padTitles = [];
    const readyRows = [];
    for (let title of titles) {
        let map = rows.map(el => el[title].toString().length);
        maxLengthMap[title] = Math.max(...map, title.length) + 1;
        padTitles.push(padString(title, maxLengthMap[title])); 
    }

    const titlesRow = padTitles.join("|");
    readyRows.push(titlesRow);
    readyRows.push("=".repeat(titlesRow.length));
    for (const row of rows) {
        const currentRow = [];
        for (const title of titles) {
            currentRow.push(padString(row[title].toString(), maxLengthMap[title])); 
        }
        readyRows.push(currentRow.join("|"));
    }
    message(readyRows);
};

const createPrompt = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

const read = (channel, question, cb, next = null) => {

    channel.setPrompt(Colors.PROMPT + question + " " + Consts.THEME_ELEMENT + " " + Colors.RESET);
    channel.prompt();
    channel.on('line', (input) => {
        input = processInput(input);
        done = cb({input, channel});
        if (!done) {
            channel.prompt();
        } else {
            channel.close();
            if (next) {
                next(done);
            }
        }  
    });    
};


module.exports.greeting = greeting;
module.exports.createPrompt =createPrompt;
module.exports.read = read;
module.exports.error = error;
module.exports.message = message;
module.exports.table = table;