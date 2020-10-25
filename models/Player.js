const {Consts} = require('../utils/constants').Player;
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
        frame = frame.map(el => el.toString().toUpperCase());
        this._validateFrame(frame);
        this.frames.push(frame);
        return this.summary();
    }

    summary() {
        return {
            player: this.name,
            frame: this._getCurrentFrame(),
            score: Player.calculateScore(this.frames),
            frames: this._formatFrames()
        };
    }

    isDone() {
        return (this._getCurrentFrame() === Consts.FULL_FRMAES_PLAYED);
    }

    getScore() {
        return Player.calculateScore(this.frames);
    }

    _getCurrentFrame() {
        return this.frames.length;
    }


    _isLastRound() {
        return this._getCurrentFrame() === Consts.LAST_ROUND;
    }

    _validateFrame(frame) {
        this._validateNotDone();
        this._validateNotEmpty(frame);
        this._validateCharacters(frame);
        this._validateFrameFormat(frame);
        this._validateBonusFrame(frame);
        this._validateFrameScore(frame);
    }

    _validateNotDone() {
        if (this.isDone()) {
            Errors.throw(Errors.Codes.MAX_FRAMES_EXCEEDED);
        }
    }

    _validateNotEmpty(frame) {
        if (!frame || frame.length === 0) {
            Errors.throw(Errors.Codes.INVALID_FRAME);
        }
    }

    _validateBonusFrame(frame) {
        if (this._isLastRound() && this._isFrameClosed(frame) && !this._isBonusFrame(frame)) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
    }

    _validateCharacters(frame) {
        const allowedCharacters = [...Array(10).keys()].map(el => el.toString()).concat(['X', '/']);
        frame.forEach(el => {
            if (!allowedCharacters.includes(el)) {
                Errors.throw(Errors.Codes.INVALID_FRAME_CHARACTER);    
            }
        });
    }

    _validateFrameScore(frame) {
        if (Player._sumFrameScore(frame) >= Consts.CLOSED_FRMAE_SCORE && !this._isFrameClosed(frame)) {
            Errors.throw(Errors.Codes.INVALID_OPEN_FRAME_SCORE);
        }
    }

    _validateFrameFormat(frame) {
        switch (frame.length) {
            case 1:
                this._validateStrikeFormat(frame);
                break;
            case 2:
                this._validateRegularFrameFormat(frame);
                break;
            case 3:
                this._validateLastFrameFormat(frame);
                break;
        }
        this._validateSpareFormat(frame);
    }

    _validateLastFrameFormat(frame) {
        if (!this._isLastRound()) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
        if (!this._isFrameClosed(frame)) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
        if ((frame[0] !== 'X' && frame[1] !== '/')) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
        
        if ((frame[0] === 'X' && frame[1] === '/')) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
        if ((frame[1] === '/' && frame[2] === '/')) {
            Errors.throw(Errors.Codes.INVALID_LAST_FRAME);
        }
    }

    _validateSpareFormat(frame) {
        if (frame[0] === '/') {
            Errors.throw(Errors.Codes.INVALID_FRAME_SPARE_FIRST);
        }
    }

    _validateStrikeFormat(frame) {
        if (frame[0] !== 'X') {
            Errors.throw(Errors.Codes.INVALID_FRAME_SINGLE_ROLE_MUST_BE_STRIKE);
        }
    }

    _validateRegularFrameFormat(frame) {
        if (frame[0] === 'X' || frame[1] === 'X') {
            Errors.throw(Errors.Codes.INVALID_FRAME_STRIKE);
        }
        if (Player._sumFrameScore(frame) > 10) {
            Errors.throw(Errors.Codes.INVALID_OPEN_FRAME_SCORE);
        }
    }

    _isFrameClosed(frame) {
        const _frame = frame.map(el => el.toString().toUpperCase());
        return (_frame.includes('X') || _frame.includes('/'));
    }

    _isBonusFrame(frame) {
        return frame.length === Consts.CLOSED_LAST_FRAME_SIZE;
    }

    _validateName(name) {
        if (!name) {
            Errors.throw(Errors.Codes.INVALID_ARGUMENTS);
        }
    }

    _formatFrames() {
        return this.frames.map(frame => frame.join(",")).join("  ");
    }

    static calculateScore(frames) {
        let score = 0;
        const _frames = [...frames];
        const rolls = [];
        const scores = [];
        _frames.forEach(frame => {
            const parsedFrame = Player._parseFrame(frame);
            rolls.push(...frame);
            scores.push(...parsedFrame);
        });
        const isBonusRoll = (_frames.length === Consts.FULL_FRMAES_PLAYED && _frames[Consts.LAST_ROUND].length === 3);
        const end = rolls.length - (isBonusRoll ? 2 : 1);
        for (let i = 0; i <= end; i++) {
            switch (rolls[i]) {
                case 'X':
                    if (i <= end - 2) {
                        score += scores[i] + scores[i + 1] + scores[i + 2];
                    }
                    break;
                case '/':
                    if (i <= end - 1) {
                        score += scores[i] + scores[i + 1];
                    }
                    break;
                default:
                    if (i < end - 1 || rolls[i + 1] != '/') {
                        score += scores[i];
                    }
                    break;
            }
        }

        if (isBonusRoll) {
            score += Player._sumFrameScore(_frames[Consts.LAST_ROUND]);
        }

        return score;
    }

    static _sumFrameScore(frame) {
        return Player._parseFrame(frame).reduce((a, b) => a + b, 0);
    }

    static _parseFrame(frame) {
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
}