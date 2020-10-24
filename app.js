const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Errors = require('./utils/errors');
const Player = require('./models/Player');
const Frame = require('./models/Frame');
const Game = require('./models/Game');
const Constants = require('./utils/constants');

const game = new Game();
// const players = [];

const makeMove = (input) => {
    const _frame = new Frame(input);
    const {player, frame, score} = game.play(_frame);
    IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
};

const readNames = ({input}) => {
    if (!validators.notEmpty(input)) {
        input = ["Player"];
    } else if (!validators.uniqueArray(input)) {
        IO.error(Errors.Codes.UNIQUE_NAMES);
        return false;
    }
    return input;
};

const readFrame = ({input, channel}) => {
    try{
        makeMove(input);
    } catch (e) {
        IO.error(e.message);
        return false;
    }
    channel.close();
    if (game.isDone()) {
        exit();
    }
    IO.read(Constants.IO.PROMPT_FRAME, readFrame);
};

const playGame = (names) => {
    const players = names.map(name => new Player(name));
    game.init(players);
    IO.read(Constants.IO.PROMPT_FRAME, readFrame);
}

const exit = () => {
    const board = game.getScoreBoard();
    const winner = board[0].player;
    board[0].player = formatWinner(winner);
    IO.table(board, gameOverMsg(winner));
    process.exit();
};

const gameOverMsg = (winner) => { 
    return `============GAME OVER! ${winner} is the winner!============`
};

const formatWinner = (winner) => {
    return "🏆 " + winner + " 🏆";
};

IO.message(Constants.IO.GREETING_MESSAGE);
IO.read(Constants.IO.PROMPT_NAMES, readNames, playGame);

// Add use
// IO.use(msg, readnames, playgame)
// IO.use(msg, )
// Keep last output




