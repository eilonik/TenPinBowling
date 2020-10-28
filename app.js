const validators = require('./utils/validators');
const IO = require('./utils/CLI/io');
const Parse = require('./utils/CLI/parse');
const Errors = require('./utils/errors');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Constants = require('./utils/constants');

const exit = (game) => {
    const scoreBoard = game.getScoreBoard();
    const winner = scoreBoard[0].player;
    scoreBoard[0].player = Parse.formatWinner(winner);
    IO.table(scoreBoard, Parse.gameOverMsg(winner));
    process.exit();
};

const readPlayers = (input) => {
    if (validators.empty(input)) {
        input.push("Player");
    }
    if (validators.hasDuplicates(input)) {
        Errors.throw(Errors.Codes.UNIQUE_NAMES);
    }
    const players = [];
    input.forEach(name => players.push(new Player(name)));
    return players;
};

const run = async () => {
    const players = await IO.read(Constants.IO.PROMPT_NAMES, readPlayers);
    const game = new Game();
    game.init(players);
    while (!game.isDone()) {
        const frameInput = await IO.read(Constants.IO.PROMPT_FRAME, input => input);
        try {
            const {player, frame, score} = game.makeMove(frameInput);
            IO.message(`Player: ${player} | Frame: ${frame} | Score: ${score}`);
        } catch (e) {
            IO.error(e);
        }
    }
    exit(game);
};

IO.message(Constants.IO.GREETING_MESSAGE);

run();