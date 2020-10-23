const Errors = require('../utils/constants').Errors;
const Consts = require('../utils/constants').Frame.Consts;
module.exports = class Frame {

    constructor(scores) {
        this.validateInput(scores);
        this.scores = [];
        this.stringScores = [];
        this.score = 0;
        this._isOpen = true;
        this._isStrike = false;
        this.parseInput(scores);
        this.validateFrame(scores);
    }

    isOpen() {
        return this._isOpen;
    }

    isStrike() {
        return this._isStrike;
    }

    getScore() {
        return this.score;
    }

    getFirst() {
        return this.scores[0];
    }

    getSecond() {
        return this.scores[1];
    }

    size() {
        return this.scores.length;
    }

    toString() {
        return this.stringScores.join(",");
    }

    parseInput(scores) {
        for (let i = 0; i < scores.length; i++) {
            let score = scores[i].toString().toUpperCase();
            this.stringScores.push(score);
            if (score === 'X') {
                this.processStrike(scores, i);
            } else if (score === '/') {
                this.processSpare(i);
            } else {
                this.processOpen(score, i);
            }
        }
    }

    // check if it is a strike not on the last frame, or on the last frame
    // where not all throws are strike
    // prior to the current location
    // scores.length === 2 is also an invalid input
    validateStrike(scores, index) {
        if ((scores.length === Consts.LAST_CLOSED_SIZE && index !== 0 && 
            this.score !== (Consts.CLOSED_FRAME_SCORE * index))) {
            throw new Error(Errors.INVALID_FRAME);
        }
        
        if (scores.length === Consts.OPEN_FRAME_SIZE) {
            throw new Error(Errors.INVALID_FRAME);
        }
    }

    validateSpare(index) {
        if (index === 0) {
            throw new Error(Errors.INVALID_FRAME);
        }
    }

    validateOpen(score) {
        if (score < 0 || score > 9) {
            throw new Error(Errors.INVALID_FRAME);
        }
    }

    validateFrame(scores) {
        if (this.score > Consts.CLOSED_FRAME_SCORE && scores.length !== Consts.LAST_CLOSED_SIZE) {
            throw new Error(Errors.INVALID_FRAME);
        }

        if (scores.length === 1 && scores[0].toString().toUpperCase() !== 'X') {
            throw new Error(Errors.INVALID_FRAME);
        }
    }

    validateInput(scores) {
        if (!scores || scores.length > 3 || scores.length < 1) {
            throw new Error(Errors.INVALID_ARGUMENTS);
        }
    }

    processStrike(scores, index) {
        this.validateStrike(scores, index);
        this.scores[index] = Consts.CLOSED_FRAME_SCORE;
        this.score += Consts.CLOSED_FRAME_SCORE;
        this._isStrike = true;
        this._isOpen = false;
    }

    processSpare(index) {
        this.validateSpare(index);
        this.score = Consts.CLOSED_FRAME_SCORE;
        this.scores[index] = Consts.CLOSED_FRAME_SCORE - this.scores[index - 1];
        this._isOpen = false;
    }

    processOpen(score, index) {
        score = parseInt(score);
        this.validateOpen(score);
        this.scores[index] = score;
        this.score += score;
    }
}