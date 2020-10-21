const Deque = require('collections/deque');
const Errors = require('../utils/constants').Errors;

module.exports = class Game {
    constructor(players) {
        if (!players || players.length === 0) {
            throw new Error(Errors.INVALID_ARGUMENTS);
        }
        this.players = players;
        this.queue = new Deque(players);
        this.currentPlayer = this.queue.shift();
    }

    play(frame) {
        if (!frame) {
            throw new Error(Errors.INVALID_FRAME);
        }
        if (this.isDone()) {
            throw new Error(Errors.MOVE_AFTER_GAME_OVER);
        }
        const play = this.currentPlayer.play(frame);
        if (!this.currentPlayer.isDone()) {
            this.queue.push(this.currentPlayer);
        }
        this.currentPlayer = this.queue.shift();
        return play;
    }

    isDone() {
        return !this.currentPlayer;
    }

    getScoreBoard() {
        this.players.sort((a, b) => b.getScore() - a.getScore());
        return this.players.map(el => el.minimize());
    }

    getCurrentPlayer() {
        return this?.currentPlayer.getName();
    }
}