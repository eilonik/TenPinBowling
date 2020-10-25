const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Errors = require('./utils/errors');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Constants = require('./utils/constants');

const game = new Game();
const players = [];

const gameOverMsg = (winner) => { 
    return `============GAME OVER! ${winner} is the winner!============`
};

const formatWinner = (winner) => {
    return "🏆 " + winner + " 🏆";
};


const makeMove = (input) => {
    const {player, frame, score} = game.makeMove(input);
    IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
};

const exit = () => {
    const board = game.getScoreBoard();
    const winner = board[0].player;
    board[0].player = formatWinner(winner);
    IO.table(board, gameOverMsg(winner));
    process.exit();
};

const play = () => {
    IO.read(Constants.IO.PROMPT_FRAME, readFrame)
    .then(play);
}

const readFrame = (input) => {
    try{
        makeMove(input);
    } catch (e) {
        IO.error(e.message);
        return false;
    }
    if (game.isDone()) {
        exit();
    }
    return true;
};

IO.message(Constants.IO.GREETING_MESSAGE);
IO.read(Constants.IO.PROMPT_NAMES, (input) => {
    if (validators.empty(input)) {
        players.push(new Player("Player"));
    } else if (validators.hasDuplicates(input)) {
        IO.error(Errors.Codes.UNIQUE_NAMES);
        return false;
    }
    input.forEach(name => players.push(new Player(name)));
    return true;
})
.then(() => {
    game.init(players);
    play();
});
