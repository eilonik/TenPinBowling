const assert = require('assert');
const Game = require('../../models/Game');
const Player = require('../../models/Player');
const Frame = require('../../models/Frame');
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
            describe("One player", function() {
                describe("All strikes", function() {
                    it("should have a score of 300", function() {
                        const player = new Player('P1');
                        const game = new Game([player]);
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X','X','X']));
                        assert.equal(player.getScore(), 300);
                    });
                });

                describe("Starts with a strike", function() {
                    it("should have a score of 168", function() {
                        const player = new Player('P1');
                        const game = new Game([player]);
                        game.play(new Frame(['X']));
                        game.play(new Frame(['7', '/']));
                        game.play(new Frame(['7', '2']));
                        game.play(new Frame(['9', '/']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['2', '3']));
                        game.play(new Frame(['6', '/']));
                        game.play(new Frame(['7', '/', '3']));
                        assert.equal(player.getScore(), 168);
                    });
                });

                describe("Starts with a spare", function() {
                    it("should have a score of 170", function() {
                        const player = new Player('P1');
                        const game = new Game([player]);
                        game.play(new Frame(['7', '/']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['7', '2']));
                        game.play(new Frame(['9', '/']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['2', '3']));
                        game.play(new Frame(['6', '/']));
                        game.play(new Frame(['7', '/', '3']));
                        assert.equal(player.getScore(), 170);
                    });
                });

                describe("Starts with an open frame", function() {
                    it("should have a score of 171", function() {
                        const player = new Player('P1');
                        const game = new Game([player]);
                        game.play(new Frame(['7', '2']));
                        game.play(new Frame(['7', '/']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['9', '/']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['X']));
                        game.play(new Frame(['2', '3']));
                        game.play(new Frame(['6', '/']));
                        game.play(new Frame(['7', '/', '3']));
                        assert.equal(player.getScore(), 171);
                    });
                });
            });
            describe("Two players", function() {
                const players = [new Player('P1'), new Player('P2')];
                const game = new Game(players);
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([1,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([4,2]));
                game.play(new Frame([4,2]));
                const board = game.getScoreBoard();
                it("should return P2 as the winner (higher on chart)", function() {
                    assert.equal(board[0].name, 'P2');
                });
                it("should have a score of 63", function() {
                    assert.equal(board[0].score, 63);
                });
            });
        });
    });

});