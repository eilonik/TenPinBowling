const Player = require('./models/Player');
const Frame = require('./models/Frame');
const Game = require('./models/Game');
const validators = require('./utils/validators');
const readline = require("readline");
const Colors = require('./utils/constants').Colors;


const createPrompt = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

const read = (channel, question, cb, next = null) => {
    channel.setPrompt(question + " >");
    channel.prompt();
    channel.on('line', (input) => {
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

const processInput = (input) => {
    return input.toString().split(",").map(el => el.replace(/\s/g, ''));
};

const greetingMessage = (color) => {
    console.log(color + "%s" + Colors.RESET, "==============================================================================================");
    console.log(color + "%s" + Colors.RESET, "  #     ###      ######  ### #     #    ######  ####### #     # #       ### #     #  #####  ");
    console.log(color + "%s" + Colors.RESET, " ##    #   #     #     #  #  ##    #    #     # #     # #  #  # #        #  ##    # #     # ");
    console.log(color + "%s" + Colors.RESET, "# #   #     #    #     #  #  # #   #    #     # #     # #  #  # #        #  # #   # #       ");
    console.log(color + "%s" + Colors.RESET, "  #   #     #    ######   #  #  #  #    ######  #     # #  #  # #        #  #  #  # #  #### ");
    console.log(color + "%s" + Colors.RESET, "  #   #     #    #        #  #   # #    #     # #     # #  #  # #        #  #   # # #     # ");
    console.log(color + "%s" + Colors.RESET, "  #    #   #     #        #  #    ##    #     # #     # #  #  # #        #  #    ## #     # ");
    console.log(color + "%s" + Colors.RESET, "#####   ###      #       ### #     #    ######  #######  ## ##  ####### ### #     #  #####  ");
    console.log(color + "%s" + Colors.RESET, "==============================================================================================");
    console.log();
}

const namesMsg = "Please enter players seperated by comma, or leave blank for a single player";
const frameMsg = "Please enter a frame, moves seperated by a comma";


greetingMessage(Colors.CYAN);

const playGame = (names) => {
    const players = names.map(name => new Player(name));
    const game = new Game(players);
    const readFrame = ({input, channel}) => {
        try {
            const frame = new Frame(processInput(input));
            console.log(game.play(frame));
        } catch (e) {
            console.log(e.message);
            return false;
        }
        // Need to close channel each time otherwise they intefere
        channel.close();
        if (game.isDone()) {
            const board = game.getScoreBoard();
            board[0].name = "🏆 " + board[0].name + " 🏆";
            console.table(board);
            process.exit();
        }
        read(createPrompt(), frameMsg, readFrame, readFrame);
    };
    read(createPrompt(), frameMsg, readFrame, readFrame);
}

read(createPrompt(), namesMsg, ({input, channel}) => {
    let names;
    if (!input) {
        names = ["Player"];
    } else {
        names = processInput(input);
        if (!validators.uniqueArray(names)) {
            return false;
        }
    }
    return names;
}, playGame);






