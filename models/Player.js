const {Consts, States} = require('../utils/constants').Player;
const Errors = require('../utils/errors');
module.exports = class Player {
    
    constructor(name) {
        this._validateName(name);
        this.name = name;
        this.frames = [];
        this.rolls = [];
        this.scores = [];
    }

    play(frame) {
        this._validateFrame(frame);
        frame = frame.map(el => el.toString().toUpperCase());
        this.frames.push(frame);
        const parsedFrame = this._parseFrame(frame);
        this.rolls.push(...frame);
        this.scores.push(...parsedFrame);
        return this.summary();
    }

    summary() {
        return {
            player: this.name,
            frame: this._getCurrentFrame(),
            score: this.getScore(),
            frames: this._formatFrames()
        };
    }

    getScore() {
        let score = 0;
        const end = this.rolls.length - (this._isBounsRoll() ? 2 : 1);
        for (let i = 0; i <= end; i++) {
            switch (this.rolls[i]) {
                case 'X':
                    if (i <= end - 2) {
                        score += this.scores[i] + this.scores[i + 1] + this.scores[i + 2];
                    }
                    break;
                case '/':
                    if (i <= end - 1) {
                        score += this.scores[i] + this.scores[i + 1];
                    }
                    break;
                default:
                    if (i < end - 1 || this.rolls[i + 1] != '/') {
                        score += this.scores[i];
                    }
                    break;
            }
        }

        if (this._isBounsRoll()) {
            score += this._parseFrame(this.frames[this.frames.length - 1]).reduce((a, b) => a + b, 0);
        }

        return score;
    }

    isDone() {
        return (this._getCurrentFrame() === Consts.FULL_FRMAES_PLAYED);
    }

    _getCurrentFrame() {
        return this.frames.length;
    }


    _isLastFrameClosed() {
        return this.frames[this.frames.length - 1].length === 3;
    }

    _isBounsRoll() {
        return (this._getCurrentFrame() === Consts.FULL_FRMAES_PLAYED && this._isLastFrameClosed());
    }

    _isLastRound() {
        return this._getCurrentFrame() === Consts.LAST_ROUND;
    }

    _validateFrame(frame) {
        if (this.isDone()) {
            Errors.throw(Errors.Codes.MAX_FRAMES_EXCEEDED);
        }

        if (!frame || frame.length === 0) {
            Errors.throw(Errors.Codes.INVALID_FRAME);
        }

        if (frame.length > Consts.OPEN_FRAME_SIZE && !this._isLastRound()) {
            Errors.throw(Errors.Codes.INVALID_FRAME_SIZE);
        }

        if (this._isLastRound()) {
            if (this._isFrameClosed(frame) && frame.length !== Consts.CLOSED_LAST_FRAME_SIZE) {
                Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
            }
        }
        
    }

    _isFrameClosed(frame) {
        const _frame = frame.map(el => el.toString().toUpperCase());
        return (_frame.includes('X') || _frame.includes('/'));
    }

    _validateName(name) {
        if (!name) {
            Errors.throw(Errors.Codes.INVALID_ARGUMENTS);
        }
    }

    _parseFrame(frame) {
        const parsed = [];
        for (let i = 0; i < frame.length; i++) {
            switch (frame[i]) {
                case 'X':
                    parsed.push(10);
                    break;
                case '/':
                    parsed.push(10 - frame[i - 1]);
                    break;
                default:
                    parsed.push(parseInt(frame[i]));
                    break;
            }
        }
        return parsed;
    }

    _formatFrames() {
        return this.frames.map(frame => frame.map(el => el.toUpperCase()).join(",")).join("  ");
    }
}