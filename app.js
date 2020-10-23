const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Player = require('./models/Player');
const Frame = require('./models/Frame');
const Game = require('./models/Game');

const namesMsg = "Please enter players seperated by comma, or leave blank for a single player";
const frameMsg = "Please enter a frame, moves seperated by a comma";
const gameOverMsg = "=====GAME OVER!=====";

IO.greeting();

const playGame = (names) => {
    const players = names.map(name => new Player(name));
    const game = new Game(players);
    const frameFields = ['player', 'frame', 'score'];
    const readFrame = ({input, channel}) => {

        // break down
        try {
            const _frame = new Frame(input);
            const {player, frame, score} = game.play(_frame);
            IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
        } catch (e) {
            IO.error(e.message);
            return false;
        }
        // Need to close channel each time otherwise they intefere
        channel.close();
        if (game.isDone()) { // wrap up in a method.
            IO.message(gameOverMsg);
            const board = game.getScoreBoard();
            board[0].player = "🏆 " + board[0].player + " 🏆";
            IO.table(board, gameOverMsg);
            process.exit();
        }
        IO.read(IO.createPrompt(), frameMsg, readFrame, readFrame);
    };
    IO.read(IO.createPrompt(), frameMsg, readFrame, readFrame);
}

IO.read(IO.createPrompt(), namesMsg, ({input, channel}) => {
    // let names;
    if (!validators.notEmpty(input)) {
        input = ["Player"];
    } else {
        // names = processInput(input);
        if (!validators.uniqueArray(input)) {
            return false;
        }
    }
    return input;
}, playGame);






