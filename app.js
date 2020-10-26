const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Parse = require('./utils/CLI/parse');
const Errors = require('./utils/errors');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Constants = require('./utils/constants');

const game = new Game();

const exit = () => {
    const scoreBoard = game.getScoreBoard();
    const winner = scoreBoard[0].player;
    scoreBoard[0].player = Parse.formatWinner(winner);
    IO.table(scoreBoard, Parse.gameOverMsg(winner));
    process.exit();
};

const readFrame = (input) => {
    const {player, frame, score} = game.makeMove(input);
    IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
    if (game.isDone()) {
        exit();
    }
    return true;
};

const readNames = (input) => {
    if (validators.empty(input)) {
        input.push("Player");
    }
    if (validators.hasDuplicates(input)) {
        Errors.throw(Errors.Codes.UNIQUE_NAMES);
    }
    const players = [];
    input.forEach(name => players.push(new Player(name)));
    game.init(players);
    return true;
};

const playGame = () => {
    IO.read(Constants.IO.PROMPT_FRAME, readFrame)
    .then(playGame);
}

IO.message(Constants.IO.GREETING_MESSAGE);

IO.read(Constants.IO.PROMPT_NAMES, readNames)
.then(playGame);