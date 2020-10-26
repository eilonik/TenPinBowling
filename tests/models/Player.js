const assert = require('assert');
const Player = require('../../models/Player');
const expectException = require('../helpers').expectException;


describe("Player", function() {
    context("Invalid inputs", function() {
        context("#constructor()", function() {
            it("should fail when trying to construct with empty argument", function() {
                expectException(function() {
                    new Player();
                });
            });
    
            it("should fail when trying to construct with empty string", function() {
                expectException(function() {
                    new Player("");
                });
            });
        });
        
        context("#play()", function() {
            it("should fail when trying to pass an empty argument", function() {
                expectException(function() {
                    let player = new Player("Player");
                    player.play();
                });
            });
            
            it("should fail when trying to use a 3 shots frame before the last round", function() {
                expectException(function() {
                    let player = new Player("Player");
                    player.play([1,2,3]);
                });
            });
        });    
    });
    
    describe("Expected output", function() {
        context("#constructor()", function() {
        
            it("should have a name property equal to the first parameter", function() {
                let player = new Player("player");
                assert.equal("player", player.name);
            });
        });

        context("#_getCurrentFrame()", function() {
            it("should return 1 after a closed frame", function() {
                let player = new Player("Player");
                player.play([1,'/']);
                assert.equal(player._getCurrentFrame(), 1);
            });
    
            it("should return 1 after an open frame", function() {
                let player = new Player("Player");
                player.play([1, 2]);
                assert.equal(player._getCurrentFrame(), 1);
            });
        });
        

        context("#isDone()", function() {
            let player;
            let frame;
            beforeEach(function() {
                player = new Player("Player");
                frame = [1, 2];
            });
            it("should return false after less than 10 frames", function() {
                for (let i = 0; i < 9; i++) {
                    player.play(frame);
                }
                assert.equal(player.isDone(), false);
            });
    
            it("should return true after 10 frames", function() {
                for (let i = 0; i < 10; i++) {
                    player.play(frame);
                }
                assert.equal(player.isDone(), true);
            });
        });
    
    
        context("#calculateScore()", function() {
            const strike = ['X'];
            it("should return 3 after a [1, 2] open frame", function() {
                assert.equal(Player.calculateScore([[1,2]]), 3);
            });
    
            it("should return 3 after a [1, 2] followed by a strike", function() {
                let openFrame = [1, 2];
                assert.equal(Player.calculateScore([openFrame, strike]), 3);
            });
    
            it("should return 0 after a strike", function() {
                assert.equal(Player.calculateScore([strike]), 0);
            });
    
            it("should return 10 after a strike followed by [0, 0]", function() {
                let openFrame = [0, 0];
                assert.equal(Player.calculateScore([strike, openFrame]), 10);
            });
            
            it("should return 20 after a strike followed by a spare", function() {
                let spare = [0, '/'];
                assert.equal(Player.calculateScore([strike, spare]), 20);
            });
    
            it("should return 20 after a spare followed by a strike", function() {
                let player = new Player("Player");
                let spare = [0, '/'];
                assert.equal(Player.calculateScore([spare, strike]), 20);
            });

            it("should return 20 after a perfect game", function() {
                const frames = Array(9).fill(strike);
                frames.push(['X', 'X', 'X']);
                assert.equal(Player.calculateScore(frames), 300);
            });

            it("should return 0 after a game with 0 success", function() {
                const frames = Array(10).fill([0, 0]);
                assert.equal(Player.calculateScore(frames), 0);
            });
        });
            
    });
    

    describe("Invalid moves", function() {
        context("#play()", function() {
            let player;
            const frame = [1,2];
            beforeEach(function() {
                new Player("Player");
            });
            it("should fail when trying to ecceed 10 frames", function() {
                expectException(function() {
                    for (let i = 0; i < 11; i++) {
                        player.play(frame);
                    }
                });
            });
    
            it("should fail when trying to play a closed last frame with less than 2 throws", function() {
                expectException(function() {
                    let lastFrame = [1,'/'];
                    for (let i = 0; i < 9; i++) {
                        player.play(frame);
                    }
                    player.play(lastFrame);
                });
            });
        });
    });
});