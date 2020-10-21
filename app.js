const Player = require('./models/Player');
const Frame = require('./models/Frame');
const Game = require('./models/Game');

const io = require('./utils/io');
const validators = require('./utils/validators');
const { empty } = require('collections/shim-object');


console.log("\x1b[36m%s\x1b[0m", "==============================================================================================");
console.log("\x1b[36m%s\x1b[0m", "  #     ###      ######  ### #     #    ######  ####### #     # #       ### #     #  #####  ");
console.log("\x1b[36m%s\x1b[0m", " ##    #   #     #     #  #  ##    #    #     # #     # #  #  # #        #  ##    # #     # ");
console.log("\x1b[36m%s\x1b[0m", "# #   #     #    #     #  #  # #   #    #     # #     # #  #  # #        #  # #   # #       ");
console.log("\x1b[36m%s\x1b[0m", "  #   #     #    ######   #  #  #  #    ######  #     # #  #  # #        #  #  #  # #  #### ");
console.log("\x1b[36m%s\x1b[0m", "  #   #     #    #        #  #   # #    #     # #     # #  #  # #        #  #   # # #     # ");
console.log("\x1b[36m%s\x1b[0m", "  #    #   #     #        #  #    ##    #     # #     # #  #  # #        #  #    ## #     # ");
console.log("\x1b[36m%s\x1b[0m", "#####   ###      #       ### #     #    ######  #######  ## ##  ####### ### #     #  #####  ");
console.log("\x1b[36m%s\x1b[0m", "==============================================================================================");
console.log();

const namesMsg = "Please enter players seperated by comma, or leave blank for a single player";
const frameMsg = "Please enter a frame, moves seperated by a comma";

const playGame = (names) => {
    const players = names.map(name => new Player(name));
    const game = new Game(players);
    const readFrame = ({input, interface}) => {
        try {
            const frame = new Frame(input.toString().split(",").map(el => el.replace(/\s/g, '')));
            console.log(game.play(frame));
        } catch (e) {
            console.log(e.message);
            return false;
        }
        // Need to close interface each time otherwise they intefere
        interface.close();
        if (game.isDone()) {
            const board = game.getScoreBoard();
            board[0].name = "🏆 " + board[0].name + " 🏆";
            console.table(board);
            process.exit();
        }
        io.read(io.createPrompt(), frameMsg, readFrame, readFrame);
    };
    io.read(io.createPrompt(), frameMsg, readFrame, readFrame);
}

io.read(io.createPrompt(), namesMsg, ({input, interface}) => {
    let names;
    if (!input) {
        names = ["Player"];
    } else {
        names = input.split(",").map(name => name.replace(/\s/g, ''));
        if (!validators.uniqueArray(names)) {
            return false;
        }
    }
    return names;
}, playGame);






