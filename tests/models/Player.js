const assert = require('assert');
const Player = require('../../models/Player')
const Frame = require('../../models/Frame')
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
                    player.play(new Frame(['1', '2', '3']));
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

        describe("#getCurrentFrame()", function() {
            it("should return 1 after a closed frame", function() {
                let player = new Player("Player");
                let frame = new Frame([1,'/']);
                player.play(frame);
                assert.equal(player.getCurrentFrame(), 1);
            });
    
            it("should return 1 after an open frame", function() {
                let player = new Player("Player");
                let frame = new Frame([1, 2]);
                player.play(frame);
                assert.equal(player.getCurrentFrame(), 1);
            });
        });
        

        describe("#isLastFrame()", function() {
        
            it("should return true after 10 frames", function() {
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
                assert.equal(player.isLastFrame(), true);
            });
    
            it("should return false after less than 10 frames", function() {
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
                assert.equal(player.isLastFrame(), false);
            });
    
        });

        describe("#isDone()", function() {
            it("should return false after less than 10 frames", function() {
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
                assert.equal(player.isDone(), false);
            });
    
            it("should return true after 10 frames", function() {
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
                assert.equal(player.isDone(), true);
            });
        });
    
        
        describe("#getState()", function() {
            it("should be OPEN after an open frame", function() {
                let player = new Player("Player");
                let frame = new Frame([1,2]);
                player.play(frame);
                assert.equal(player.getState(), States.OPEN);
            });
            
            it("should be ONE_STRIKE after a strike", function() {
                let player = new Player("Player");
                let frame = new Frame(['X']);
                player.play(frame);
                assert.equal(player.getState(), States.ONE_STRIKE);
            });
    
            it("should be TWO_STRIKES after 2 strikes", function() {
                let player = new Player("Player");
                let frame = new Frame(['X']);
                player.play(frame);
                player.play(frame);
                assert.equal(player.getState(), States.TWO_STRIKES);
            });
    
            it("should be ONE_SPARE after a spare", function() {
                let player = new Player("Player");
                let frame = new Frame(['1', '/']);
                player.play(frame);
                assert.equal(player.getState(), States.ONE_SPARE);
            });
    
            it("should be OPEN after a strike followed by an open frame", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                let openFrame = new Frame(['1', '2']);
                player.play(strike);
                player.play(openFrame);
                assert.equal(player.getState(), States.OPEN);
            });
    
            it("should be ONE_SPARE after a strike followed by a spare", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                let spare = new Frame(['1', '/']);
                player.play(strike);
                player.play(spare);
                assert.equal(player.getState(), States.ONE_SPARE);
            });
        });
    
        describe("#getScore()", function() {
            it("should return 3 after a [1, 2] open frame", function() {
                let player = new Player("Player");
                let frame = new Frame([1,2]);
                player.play(frame);
                assert.equal(player.getScore(), 3);
            });
    
            it("should return 3 after a [1, 2] followed by a strike", function() {
                let player = new Player("Player");
                let frame = new Frame([1,2]);
                let strike = new Frame(['X']);
                player.play(frame);
                player.play(strike);
                assert.equal(player.getScore(), 3);
            });
    
            it("should return 0 after a strike", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                player.play(strike);
                assert.equal(player.getScore(), 0);
            });
    
            it("should return 10 after a strike followed by [0, 0]", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                let frame = new Frame([0, 0]);
                player.play(strike);
                player.play(frame);
                assert.equal(player.getScore(), 10);
            });
            
            it("should return 20 after a strike followed by a spare", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                let spare = new Frame([0, '/']);
                player.play(strike);
                player.play(spare);
                assert.equal(player.getScore(), 20);
            });
    
            it("should return 20 after a spare followed by a strike", function() {
                let player = new Player("Player");
                let strike = new Frame(['X']);
                let spare = new Frame([0, '/']);
                player.play(spare);
                player.play(strike);
                assert.equal(player.getScore(), 20);
            });
        });
        
        describe("#processFrame()", function() {
            it("should increase score by the score of an open frame", function() {
                let player = new Player("Player");
                assert.equal(player.score, 0);
                let frame = new Frame([1, 2]);
                player.processFrame(frame);
                assert.equal(player.getScore(), frame.getScore());
            });
    
            it("should not increase score for a spare", function() {
                let player = new Player("Player");
                assert.equal(player.score, 0);
                let frame = new Frame([1, '/']);
                player.processFrame(frame);
                assert.equal(player.getScore(), 0);
            });
    
            it("should not increase score for a strike", function() {
                let player = new Player("Player");
                assert.equal(player.score, 0);
                let frame = new Frame(['X']);
                player.processFrame(frame);
                assert.equal(player.getScore(), 0);
            });
        });
    
        describe("#getName()", function() {
            it("should return the player's name", function() {
                let player = new Player("Player");
                assert.equal(player.getName(), "Player");
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