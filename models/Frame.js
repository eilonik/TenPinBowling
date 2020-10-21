module.exports = class Frame {
    constructor(scores) {
        if (!scores || scores.length > 3 || scores.length < 1) {
            throw new Error('Invalid input');
        }
        this.scores = [];
        this.stringScores = [];
        this.score = 0;
        this._isOpen = true;
        this._isStrike = false;
        for (let i = 0; i < scores.length; i++) {
            let score = scores[i].toString().toUpperCase();
            this.stringScores.push(score);
            if (score === 'X') {
                // check if it is a strike not on the last frame, or on the last frame
                // where not all throws are strike
                // prior to the current location
                // scores.length === 2 is also an invalid input
                if ((scores.length === 3 && i !== 0 && this.score !== (10 * i)) || scores.length === 2) {
                    throw new Error('Invalid strike');
                }
                this.scores[i] = 10;
                this.score += 10;
                this._isStrike = true;
                this._isOpen = false;
            } else if (score === '/') {
                if (i === 0) {
                    throw new Error('Invalid pins');
                }
                this.score = 10;
                this.scores[i] = 10 - this.scores[i - 1];
                this._isOpen = false;
            } else {
                score = parseInt(score);
                if (score < 0 || score > 9) {
                    throw new Error('Invalid number of pins');
                }
                this.scores[i] = score;
                this.score += score;
            }
        }

        if (this.score > 10 && scores.length !== 3) {
            throw new Error('Invalid frame');
        }

        if (scores.length === 1 && scores[0].toString().toUpperCase() !== 'X') {
            throw new Error('Invalid frame');
        }
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
    
}