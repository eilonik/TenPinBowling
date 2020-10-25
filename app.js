const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Errors = require('./utils/errors');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Constants = require('./utils/constants');

const game = new Game();
const players = [];

const makeMove = (input) => {
    // const _frame = new Frame(input);
    const {player, frame, score} = game.makeMove(input);
    IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
};

const readNames = ({input}) => {
    if (validators.empty(input)) {
        players.push(new Player("Player"));
    } else if (validators.hasDuplicates(input)) {
        IO.error(Errors.Codes.UNIQUE_NAMES);
        return false;
    }
    input.forEach(name => players.push(new Player(name)));
    return true;
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

const start = () => {
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
IO.read(Constants.IO.PROMPT_NAMES, readNames, start);

// Add use
// IO.use(msg, readnames, playgame)
// IO.use(msg, )
// Keep last output
