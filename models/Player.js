module.exports = class Player {
    constructor(name) {
        if (!name) {
            throw new Error("Invalid name!");
        }
        this.name = name;
        this.score = 0;
        this.frames = [];
        this.pendingFrames = [];

        this.states = {
            ONE_STRIKE: 1,
            ONE_SPARE: 2,
            TWO_STRIKES: 3,
            OPEN: 4,
        };

        this.consts = {
            LAST_ROUND: 9,
            NORMAL_FRAME_SIZE: 2,
            LAST_FRAME_SIZE: 3,
            THREE_STRIKES_SCORE: 30
        };
    }

    play(frame) {

        if (this.isDone()) {
            throw new Error('Maximum frames excceeded');
        }

        if (!frame) {
            throw new Error('Invalid frame');
        }

        if (frame.size() > this.consts.NORMAL_FRAME_SIZE && this.getCurrentFrame() !== this.consts.LAST_ROUND) {
            throw new Error('Invalid frame, size > 2 before last round');
        }

        let state = this.getState();
        
        switch (state) {
            case this.states.OPEN: {
                this.processFrame(frame);    
                break;
            }
            
            case this.states.ONE_STRIKE: {

                let pendingFrame = this.pendingFrames.pop();
                if (frame.isStrike()) {
                    this.pendingFrames.push(pendingFrame, frame);
                } else {
                    this.score += pendingFrame.getScore() + frame.getScore();
                    this.frames.push(pendingFrame);
                    this.processFrame(frame);
                }
                break;
            }

            case this.states.ONE_SPARE: {
                let pendingFrame = this.pendingFrames.pop();
                this.score += pendingFrame.getScore() + frame.getFirst();
                this.frames.push(pendingFrame);
                this.processFrame(frame);
                break;
            }

            case this.states.TWO_STRIKES: {
                let secondPending = this.pendingFrames.pop();
                let firstPending = this.pendingFrames.pop();
                if (frame.isStrike() && frame.size() <= this.consts.NORMAL_FRAME_SIZE) {
                    this.score += this.consts.THREE_STRIKES_SCORE;
                    this.frames.push(firstPending);
                    this.pendingFrames.push(secondPending, frame);
                } else  {
                    this.score += this.consts.THREE_STRIKES_SCORE + (2 * frame.getFirst()) + frame.getSecond();
                    this.frames.push(firstPending, secondPending);
                    this.processFrame(frame);
                }
                break;
            }
        }

        if (this.isLastFrame()) {
            if (!frame.isOpen() && frame.size() !== this.consts.LAST_FRAME_SIZE) {
                throw new Error('Invalid input - non-open 10th frame must have 3 throws');
            }
            this.score += frame.getScore();

        }

        return {
            player: this.name,
            frame: this.getCurrentFrame(),
            score: this.score
        };
       
    }

    isLastFrame() {
        return (this.getCurrentFrame() === 10);
    }

    getCurrentFrame() {
        return this.frames.length + this.pendingFrames.length;
    }

    isDone() {
        return (this.frames.length === 10);
    }

    getState() {
        let length = this.pendingFrames.length;
        if (length === 2) {
            return this.states.TWO_STRIKES;
        } else if(length === 1) {
            if (this.pendingFrames[0].isStrike()) {
                return this.states.ONE_STRIKE;
            } else {
                return this.states.ONE_SPARE;
            }
        }
        return this.states.OPEN;
    }

    getScore() {
        return this.score;
    }

    processFrame(frame) {
        if (frame.isOpen()) {
            this.score += frame.getScore();
            this.frames.push(frame);
        } else {
            this.pendingFrames.push(frame);
        }
    }

    getName() {
        return this.name;
    }

    formatFrames() {
        return this.frames.map(el => el.toString()).join("  ");
    }

    minimize() {
        return {
            name: this.name,
            score: this.score,
            frames: this.formatFrames()
        };
    }

}