const assert = require('assert');
const Game = require('../../models/Game')
const expectException = require('../helpers').expectException;

describe("Game", function() {
    describe("Invalid inputs", function() {
        describe("#constructor()", function() {
            it("should fail if the players parameter is null", function() {
                expectException(function() {
                    new Game();
                });
            });

            it("should fail if the players parameter is an empty array", function() {
                expectException(function() {
                    new Game();
                });
            });
        });

        describe("#play()", function() {
            it("should fail if move is null", function() {
                expectException(function() {
                    const game = new Game([new Player("player1")]);
                    game.play();
                });
            });
        });

    });

    describe("Expected outputs", function() {
        describe("#play()", function() {
            
        });
    });

});