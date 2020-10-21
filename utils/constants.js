module.exports = {
    Player: {
        States: {
            ONE_STRIKE: 1,
            ONE_SPARE: 2,
            TWO_STRIKES: 3,
            OPEN: 4,
        },

        Consts: {
            LAST_ROUND: 9,
            NORMAL_FRAME_SIZE: 2,
            LAST_FRAME_SIZE: 3,
            THREE_STRIKES_SCORE: 30
        },
    },
    Errors: {
        MAX_FRAMES_EXCEEDED: 'Maximum frames excceeded',
        INVALID_FRAME: 'Invalid frame',
        INVALID_FRAME_SIZE: 'Invalid frame, size > 2 before last round',
        INVALID_LAST_FRAME: 'Invalid frame for last round',
        MOVE_AFTER_GAME_OVER: 'Move after game is over',
        INVALID_ARGUMENTS: 'Invalid arguments',
    },
    Colors: {
        CYAN: "\x1b[36m",
        RESET: "\x1b[0m",
    }
};