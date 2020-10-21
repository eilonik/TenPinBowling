const {Consts, States} = require('../utils/constants').Player;
const Errors = require('../utils/constants').Errors;
module.exports = class Player {
    
    constructor(name) {
        if (!name) {
            throw new Error("Invalid name!");
        }
        this.name = name;
        this.score = 0;
        this.frames = [];
        this.pendingFrames = [];
    }

    play(frame) {
        this.validateFrame(frame);
        let state = this.getState();
        switch (state) {
            case States.OPEN: {
                this.processFrame(frame);    
                break;
            }
            
            case States.ONE_STRIKE: {
                this.processFrameOneStrike(frame);
                break;
            }

            case States.ONE_SPARE: {
                this.processFrameOneSpare(frame);
                break;
            }

            case States.TWO_STRIKES: {
                this.processFrameTwoStrikes(frame);
                break;
            }
        }

        if (this.isLastFrame()) {
            if (!frame.isOpen() && frame.size() !== Consts.LAST_FRAME_SIZE) {
                throw new Error(Errors.INVALID_LAST_FRAME);
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
        return (this.getCurrentFrame() === 10);
    }

    getState() {
        let length = this.pendingFrames.length;
        if (length === 2) {
            return States.TWO_STRIKES;
        } else if(length === 1) {
            if (this.pendingFrames[0].isStrike()) {
                return States.ONE_STRIKE;
            } else {
                return States.ONE_SPARE;
            }
        }
        return States.OPEN;
    }

    getScore() {
        return this.score;
    }

    processFrame(frame) {
        if (frame.isOpen()) {
            this.score += frame.getScore();
            this.frames.push(frame);
        } else {
            if (this.getCurrentFrame() === 9) {
                this.frames.push(frame);
            } else {
                this.pendingFrames.push(frame);
            }
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

    validateFrame(frame) {
        if (this.isDone()) {
            throw new Error(Errors.MAX_FRAMES_EXCEEDED);
        }

        if (!frame) {
            throw new Error(Errors.INVALID_FRAME);
        }

        if (frame.size() > Consts.NORMAL_FRAME_SIZE && this.getCurrentFrame() !== Consts.LAST_ROUND) {
            throw new Error(Errors.INVALID_FRAME_SIZE);
        }

        if (!frame.isOpen() && this.getCurrentFrame() === Consts.LAST_ROUND && frame.size() !== Consts.LAST_FRAME_SIZE) {
            throw new Error(Errors.INVALID_LAST_FRAME);
        }
    }

    processFrameOneStrike(frame) {
        let pendingFrame = this.pendingFrames.pop();
        if (frame.isStrike()) {
            this.pendingFrames.push(pendingFrame, frame);
        } else {
            this.score += pendingFrame.getScore() + frame.getScore();
            this.frames.push(pendingFrame);
            this.processFrame(frame);
        }
    }

    processFrameOneSpare(frame) {
        let pendingFrame = this.pendingFrames.pop();
        this.score += pendingFrame.getScore() + frame.getFirst();
        this.frames.push(pendingFrame);
        this.processFrame(frame);
    }

    processFrameTwoStrikes(frame) {
        let secondPending = this.pendingFrames.pop();
        let firstPending = this.pendingFrames.pop();
        if (frame.isStrike() && frame.size() <= Consts.NORMAL_FRAME_SIZE) {
            this.score += Consts.THREE_STRIKES_SCORE;
            this.frames.push(firstPending);
            this.pendingFrames.push(secondPending, frame);
        } else  {
            this.score += Consts.THREE_STRIKES_SCORE + (2 * frame.getFirst()) + frame.getSecond();
            this.frames.push(firstPending, secondPending);
            this.processFrame(frame);
        }
    }
}