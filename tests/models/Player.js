const assert = require('assert');
const Player = require('../../models/Player');
const expectException = require('../helpers').expectException;
const {States} = require('../../utils/constants').Player;


describe("Player", function() {
    describe("Invalid inputs", function() {
        describe("#constructor()", function() {
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
        
        describe("#play()", function() {
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
        describe("#constructor()", function() {
        
            it("should have a name property equal to the first parameter", function() {
                let player = new Player("player");
                assert.equal("player", player.name);
            });
        });

        describe("#_getCurrentFrame()", function() {
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
        

        describe("#isDone()", function() {
            it("should return false after less than 10 frames", function() {
                let player = new Player("Player");
                let frame = [1, 2];
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                assert.equal(player.isDone(), false);
            });
    
            it("should return true after 10 frames", function() {
                let player = new Player("Player");
                let frame = [1, 2];
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                player.play(frame);
                assert.equal(player.isDone(), true);
            });
        });
    
    
        describe("#getScore()", function() {
            it("should return 3 after a [1, 2] open frame", function() {
                let player = new Player("Player");
                let frame = [1, 2];
                player.play(frame);
                assert.equal(player.getScore(), 3);
            });
    
            it("should return 3 after a [1, 2] followed by a strike", function() {
                let player = new Player("Player");
                let frame = [1, 2];
                let strike = ['X'];
                player.play(frame);
                player.play(strike);
                assert.equal(player.getScore(), 3);
            });
    
            it("should return 0 after a strike", function() {
                let player = new Player("Player");
                let strike = ['X'];
                player.play(strike);
                assert.equal(player.getScore(), 0);
            });
    
            it("should return 10 after a strike followed by [0, 0]", function() {
                let player = new Player("Player");
                let strike = ['X'];
                let frame = [0, 0];
                player.play(strike);
                player.play(frame);
                assert.equal(player.getScore(), 10);
            });
            
            it("should return 20 after a strike followed by a spare", function() {
                let player = new Player("Player");
                let strike = ['X'];
                let spare = [0, '/'];
                player.play(strike);
                player.play(spare);
                assert.equal(player.getScore(), 20);
            });
    
            it("should return 20 after a spare followed by a strike", function() {
                let player = new Player("Player");
                let strike = ['X'];
                let spare = [0, '/'];
                player.play(spare);
                player.play(strike);
                assert.equal(player.getScore(), 20);
            });
        });
            
    });
    

    describe("Invalid moves", function() {
        describe("#play()", function() {
            it("should fail when trying to ecceed 10 frames", function() {
                expectException(function() {
                    let player = new Player("Player");
                    let frame = new Frame([1,2]);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                });
            });
    
            it("should fail when trying to play a closed last frame with less than 2 throws", function() {
                expectException(function() {
                    let player = new Player("Player");
                    let frame = new Frame([1,2]);
                    let lastFrame = new Frame([1,'/']);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(frame);
                    player.play(lastFrame);
                });
            });
        });
    });
});