const readline = require("readline");
const {Colors, Consts} = require('../constants').IO;

const processInput = (input) => {
    if (!input) {
        return [];
    }
    return input.toString().split(",").map(el => el.replace(/\s/g, ''));
};

const centeredMessageStart = (length) => {
return " ".repeat(Math.max((process.stdout.columns - length) / 2, 0));
}

const greeting = (color = Colors.CYAN) => {
    const horizontalFrame = Consts.THEME_ELEMENT.repeat(52);
    const verticalFrame = Consts.THEME_ELEMENT.repeat(2);
    const messagePadding = centeredMessageStart(100);
    console.log(messagePadding + horizontalFrame);
    console.log(messagePadding + horizontalFrame);
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, "   #     ###       ######  ### #     #     ######  ####### #     # #       ### #     #  #####   ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, "  ##    #   #      #     #  #  ##    #     #     # #     # #  #  # #        #  ##    # #     #  ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, " # #   #     #     #     #  #  # #   #     #     # #     # #  #  # #        #  # #   # #        ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, "   #   #     #     ######   #  #  #  #     ######  #     # #  #  # #        #  #  #  # #  ####  ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, "   #   #     #     #        #  #   # #     #     # #     # #  #  # #        #  #   # # #     #  ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, "   #    #   #      #        #  #    ##     #     # #     # #  #  # #        #  #    ## #     #  ");
    console.log(messagePadding + color + verticalFrame + "%s" + verticalFrame + Colors.RESET, " #####   ###       #       ### #     #     ######  #######  ## ##  ####### ### #     #  #####   ");
    console.log(messagePadding + horizontalFrame);
    console.log(messagePadding + horizontalFrame);
    console.log();
};

const error = (msg) => {
    console.log(Colors.ERROR + "%s" + Colors.RESET, msg);
}

const message = (msg) => {
    const frame = new Array(Math.ceil(msg.length / 2) + 3).fill(Consts.THEME_ELEMENT).join("");
    const padding = centeredMessageStart(frame.length);
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, Consts.THEME_ELEMENT + " " + msg + " " + Consts.THEME_ELEMENT);
    console.log(padding + Colors.MESSAGE + "%s" + Colors.RESET, frame);
}

const createPrompt = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

const read = (channel, question, cb, next = null) => {
    channel.setPrompt(question + "> ");
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