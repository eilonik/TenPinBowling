module.exports.Codes = {
    MAX_FRAMES_EXCEEDED: 'Maximum frames excceeded',
    INVALID_FRAME: 'Invalid frame',
    INVALID_FRAME_STRIKE: 'More than 1 throw for a strike frame',
    INVALID_FRAME_LAST_STRIKE: 'Stike in last frame must be in a row',
    INVALID_FRAME_SCORE_OUT_OF_RANGE: 'Invalid frame, scores must be integers >=0 and <=9',
    INVALID_FRAME_SCORE_NON_LAST_FRAME: 'Invalid frame, scores > 10 can only be in last frame with 3 rolls',
    INVALID_FRAME_OPEN_SCORE: 'Invalid frame, open frame score must be < 10',
    INVALID_FRAME_SINGLE_ROLE_MUST_BE_STRIKE: 'Invalid frame, single roll must be strike',
    INVALID_FRAME_SPARE_FIRST: "Invalid frame, spare can't be the first throw",
    INVALID_FRAME_SIZE: 'Invalid frame, size must be >=1 and <= 3',
    INVALID_LAST_FRAME: 'Invalid frame for last round',
    MOVE_AFTER_GAME_OVER: 'Move after game is over',
    INVALID_ARGUMENTS: 'Invalid arguments',
    UNIQUE_NAMES: 'Invalid names, must be unique'
}

module.exports.throw = (err) => {
    throw new Error(err)
}