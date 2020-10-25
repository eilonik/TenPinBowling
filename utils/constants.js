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
            FULL_FRMAES_PLAYED: 10,
            OPEN_FRAME_SIZE: 2,
            CLOSED_LAST_FRAME_SIZE: 3,
            THREE_STRIKES_SCORE: 30,
            CLOSED_FRMAE_SCORE: 10
        },
    },

    IO: {
        Colors: {
            CYAN: "\x1b[36m",
            RESET: "\x1b[0m",
            ERROR: "\x1b[41m",
            MESSAGE: "\x1b[46m\x1b[31m",
            PROMPT: "\x1b[32m"
        },
        THEME_ELEMENT: "🎳",
        GREETING_MESSAGE: [
            "   #     ###       ######  ### #     #     ######  ####### #     # #       ### #     #  #####   ",
            "  ##    #   #      #     #  #  ##    #     #     # #     # #  #  # #        #  ##    # #     #  ",
            " # #   #     #     #     #  #  # #   #     #     # #     # #  #  # #        #  # #   # #        ",
            "   #   #     #     ######   #  #  #  #     ######  #     # #  #  # #        #  #  #  # #  ####  ",
            "   #   #     #     #        #  #   # #     #     # #     # #  #  # #        #  #   # # #     #  ",
            "   #    #   #      #        #  #    ##     #     # #     # #  #  # #        #  #    ## #     #  ",
            " #####   ###       #       ### #     #     ######  #######  ## ##  ####### ### #     #  #####   "
        ],
        PROMPT_NAMES: "Please enter players seperated by comma, or leave blank for a single player",
        PROMPT_FRAME: "Please enter a frame, moves seperated by a comma"
    }
};