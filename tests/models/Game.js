const assert = require('assert');
const Game = require('../../models/Game');
const Player = require('../../models/Player');
const expectException = require('../helpers').expectException;

describe("Game", function() {
    context("Invalid inputs", function() {
        context("#init()", function() {
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

        context("#makeMove()", function() {
            it("should fail if move is null", function() {
                expectException(function() {
                    const game = new Game();
                    game.init([new Player("player1")]);
                    game.makeMove();
                });
            });
        });

    });

    describe("Expected outputs", function() {
        context("#makeMove()", function() {
            let game;
            beforeEach(function() {
                game = new Game();
            });
            context("One player", function() {
                let player;
                const strike = ['X'];
                beforeEach(function() {
                    player = new Player('P1');
                    game.init([player]);
                });
                context("All strikes", function() {
                    it("should have a score of 300", function() {
                        for (let i = 0; i < 9; i++) {
                            game.makeMove(strike);
                        }
                        game.makeMove(['X','X','X']);
                        assert.equal(player.getScore(), 300);
                    });
                });

                context("Starts with a strike", function() {
                    it("should have a score of 168", function() {
                        game.makeMove(['X']);
                        game.makeMove(['7', '/']);
                        game.makeMove(['7', '2']);
                        game.makeMove(['9', '/']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['2', '3']);
                        game.makeMove(['6', '/']);
                        game.makeMove(['7', '/', '3']);
                        assert.equal(player.getScore(), 168);
                    });
                });

                context("Starts with a spare", function() {
                    it("should have a score of 170", function() {
                        game.makeMove(['7', '/']);
                        game.makeMove(['X']);
                        game.makeMove(['7', '2']);
                        game.makeMove(['9', '/']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['2', '3']);
                        game.makeMove(['6', '/']);
                        game.makeMove(['7', '/', '3']);
                        assert.equal(player.getScore(), 170);
                    });
                });

                context("Starts with an open frame", function() {
                    it("should have a score of 171", function() {
                        game.makeMove(['7', '2']);
                        game.makeMove(['7', '/']);
                        game.makeMove(['X']);
                        game.makeMove(['9', '/']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['X']);
                        game.makeMove(['2', '3']);
                        game.makeMove(['6', '/']);
                        game.makeMove(['7', '/', '3']);
                        assert.equal(player.getScore(), 171);
                    });
                });
            });
            
            context("Two players", function() {
                let players;
                beforeEach(function() {
                    players = [new Player('P1'), new Player('P2')];
                    game.init(players);
                });
                it("Players 2 gets higher scores", function() {
                    for (let i = 0; i < 10; i++) {
                        game.makeMove([1,2]);
                        game.makeMove([4,2]);
                    }
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

        context("#isDone", function() {
            context('One player', function() {
                let game;
                let frame = [1,1];
                beforeEach(function() {
                    game = new Game();
                    players = [new Player('P1')];
                    game.init(players);
                });

                it("should return false if played less than 10 moves", function() {
                    for (let i = 0; i < 9; i++) {
                        game.makeMove(frame);
                    }
                    assert.equal(game.isDone(), false);
                });

                it("should return true if played 10 moves", function() {
                    for (let i = 0; i < 10; i++) {
                        game.makeMove(frame);
                    }
                    assert.equal(game.isDone(), true);
                });

            });

            context('Two players', function() {
                let game;
                let frame = [1,1];
                beforeEach(function() {
                    game = new Game();
                    players = [new Player('P1'), new Player('P2')];
                    game.init(players);
                });

                it("should return false if both played less than 10 moves", function() {
                    for (let i = 0; i < 18; i++) {
                        game.makeMove(frame);
                    }
                    assert.equal(game.isDone(), false);
                });

                it("should return false if only one played 10 moves", function() {
                    for (let i = 0; i < 19; i++) {
                        game.makeMove(frame);
                    }
                    assert.equal(game.isDone(), false);
                });

                it("should return true if both played 10 moves", function() {
                    for (let i = 0; i < 20; i++) {
                        game.makeMove(frame);
                    }
                    assert.equal(game.isDone(), true);
                });
            });
        });

        context("#switchPlayer", function() {
            
            const playerDone = {
                name: 'PlayerDone',
                isDone() {
                    return true;
                }
            };
            
            const playerNotDone = {
                name: 'PlayerNotDone',
                isDone() {
                    return false;
                }
            };
            
            let game;
            beforeEach(function() {
                game = new Game();
            });

            context('One player', function() {
                context('Player has played 10 frames', function() {
                    it("Should have null as the current player", function() {
                        game.init([playerDone]);
                        game.switchPlayers();
                        assert.equal(game.currentPlayer, null);
                    });
                });

                context('Player has played less than 10 frames', function() {
                    it("Should have a player named PlayerNotDone as the current player after one switch", function() {
                        game.init([playerNotDone]);
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone');
                    });

                    it("Should have a player named PlayerNotDone as the current player after two switchs", function() {
                        game.init([playerNotDone]);
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone');
                    });
                });
            });

            context('Two players', function() {
                context('Both players played less than 10 frames', function() {
                    const player1 = Object.assign({}, playerNotDone, {name: 'PlayerNotDone1'});
                    const player2 = Object.assign({}, playerNotDone, {name: 'PlayerNotDone2'});
                    beforeEach(function() {
                        game.init([player1, player2]);
                    });
                    it("Should have a player named PlayerNotDone2 as the current player after one switch", function() {
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone2');
                    });

                    it("Should have a player named PlayerNotDone1 as the current player after two switchs", function() {
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone1');
                    });

                    it("Should have a player named PlayerNotDone2 as the current player after two switchs", function() {
                        game.switchPlayers();
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone2');
                    });
                });

                context('One player played less than 10 frames, the other played 10 frames', function() {
                    const player1 = Object.assign({}, playerNotDone, {name: 'PlayerNotDone'});
                    const player2 = Object.assign({}, playerDone, {name: 'PlayerDone'});
                    beforeEach(function() {
                        game.init([player1, player2]);
                    });
                    it("Should have a player named PlayerDone as the current player after one switch", function() {
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerDone');
                    });

                    it("Should have a player named PlayerNotDone as the current player after two switchs", function() {
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone');
                    });

                    it("Should have a player named PlayerNotDone as the current player after two switchs", function() {
                        game.switchPlayers();
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'PlayerNotDone');
                    });
                });

                context('Both players played 10 frames', function() {
                    const player1 = Object.assign({}, playerDone, {name: 'Player1'});
                    const player2 = Object.assign({}, playerDone, {name: 'Player2'});
                    beforeEach(function() {
                        game.init([player1, player2]);
                    });
                    it("Should have a player2 named PlayerDone as the current player after one switch", function() {
                        game.switchPlayers();
                        assert.equal(game.currentPlayer.name, 'Player2');
                    });

                    it("Should should be null after two switchs", function() {
                        game.switchPlayers();
                        game.switchPlayers();
                        assert.equal(game.currentPlayer, null);
                    });

                    it("Should should fail after three switchs", function() {
                        expectException(function() {
                            game.switchPlayers();
                            game.switchPlayers();
                            game.switchPlayers();
                        });
                        
                    });
                });
            });
        });
    });
});