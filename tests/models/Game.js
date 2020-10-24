const assert = require('assert');
const Game = require('../../models/Game');
const Player = require('../../models/Player');
const Frame = require('../../models/Frame');
const expectException = require('../helpers').expectException;

describe("Game", function() {
    describe("Invalid inputs", function() {
        describe("#init()", function() {
            beforeEach(function () {
                const game = new Game();
            })
            it("should fail if the players parameter is null", function() {
                expectException(function() {
                    game.init();
                });
            });

            it("should fail if the players parameter is an empty array", function() {
                expectException(function() {
                    game.init([]);
                });
            });
        });

        describe("#play()", function() {
            it("should fail if move is null", function() {
                expectException(function() {
                    const game = new Game();
                    game.init([new Player("player1")]);
                    game.play();
                });
            });
        });

    });

    describe("Expected outputs", function() {
        context("#play()", function() {
            context("One player", function() {
                let game;
                let player;
                beforeEach(function() {
                    game = new Game();
                    player = new Player('P1');
                    game.init([player]);
                });
                context("All strikes", function() {
                    it("should have a score of 300", function() {
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

                context("Starts with a strike", function() {
                    it("should have a score of 168", function() {
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

                context("Starts with a spare", function() {
                    it("should have a score of 170", function() {
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

                context("Starts with an open frame", function() {
                    it("should have a score of 171", function() {
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
                let game;
                let players;
                beforeEach(function() {
                    game = new Game();
                    players = [new Player('P1'), new Player('P2')];
                    game.init(players);
                });
                it("Players 2 gets higher scores", function() {
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
                        assert.equal(board[0].player, 'P2');
                    });
                    it("should have a score of 63", function() {
                        assert.equal(board[0].score, 63);
                    });
                });
            });
        });
    });

});