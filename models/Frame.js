const Errors = require('../utils/errors')
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
            switch (score) {
                case 'X':
                    this.processStrike(scores, i);
                    break;
                case '/':
                    this.processSpare(i);
                    break;
                default:
                    this.processOpen(score, i);
                    break;
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
            Errors.throw(Errors.Codes.INVALID_FRAME_LAST_STRIKE);
        }
        
        if (scores.length === Consts.OPEN_FRAME_SIZE) {
            Errors.throw(Errors.Codes.INVALID_FRAME_STRIKE);
        }
    }

    validateSpare(index) {
        if (index === 0) {
            Errors.throw(Errors.Codes.INVALID_FRAME_SPARE_FIRST);
        }
    }

    validateOpen(score) {
        if (isNaN(score) || score < 0 || score > 9) {
            Errors.throw(Errors.Codes.INVALID_FRAME_SCORE_OUT_OF_RANGE);
        }
    }

    validateFrame(scores) {
        if (this.score > Consts.CLOSED_FRAME_SCORE && scores.length !== Consts.LAST_CLOSED_SIZE) {
            Errors.throw(Errors.Codes.INVALID_FRAME_SCORE_NON_LAST_FRAME);
        }

        if (scores.length === 1 && scores[0].toString().toUpperCase() !== 'X') {
            Errors.throw(Errors.Codes.INVALID_FRAME_SINGLE_ROLE_MUST_BE_STRIKE);
        }

        if (this.score >= Consts.CLOSED_FRAME_SCORE && this.isOpen()) {
            Errors.throw(Errors.Codes.INVALID_FRAME_OPEN_SCORE);
        }
    }

    validateInput(scores) {
        if (!scores || scores.length > Consts.LAST_CLOSED_SIZE || scores.length < Consts.STRIKE_SIZE) {
            Errors.throw(Errors.Codes.INVALID_FRAME_SIZE);
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