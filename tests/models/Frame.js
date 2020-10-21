const assert = require('assert');
const Frame = require('../../models/Frame')
const expectException = require('../helpers').expectException;

describe("Frame", function() {
    describe("Invalid input", function() {
        describe("#constructor()", function() {
            it("should fail when trying to construct with empty argument", function() {
                expectException(function() {
                    let frame = new Frame();
                });
            });
    
            it("should fail when trying to construct with empty array", function() {
                expectException(function() {
                    let frame = new Frame([]);
                });
            });
    
            it("should fail when trying to construct with array that has length > 3", function() {
                expectException(function() {
                    let frame = new Frame([1,1,1,1]);
                });
            });
    
            it("should fail when trying to construct with 2 arguments that one is a strike", function() {
                expectException(function() {
                    let frame = new Frame([1,'X']);
                });
            });
    
            it("should fail when trying to construct with spare as 1st argument", function() {
                expectException(function() {
                    let frame = new Frame(['/', 2]);
                });
            });
    
            it("should fail when trying to construct with sum greater than 10", function() {
                expectException(function() {
                    let frame = new Frame([4, 9]);
                });
            });
    
            it("should fail when trying to construct hits out of range", function() {
                expectException(function() {
                    let frame = new Frame([4, 11]);
                });
            });
        });
    });
    
    describe("Expected output", function() {
        describe("#constructor()", function() {
            it("should succeed when strike is a single argument", function() {
                let frame = new Frame(['X']);  
            });
    
            it("should succeed with a triple strike", function() {
                let frame = new Frame(['X', 'X', 'X']);  
            });
        });

        describe("#isOpen()", function() {
            it("should return true when frame score is < 10", function() {
                let frame = new Frame(['1', '2']);
                assert.equal(frame.isOpen(), true);
            });
    
            it("should return false for spare", function() {
                let frame = new Frame(['1', '/']);
                assert.equal(frame.isOpen(), false);
            });
    
            it("should return false for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.isOpen(), false);
            });
        });

        describe("#isStrike()", function() {

            it("should return true for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.isStrike(), true);
            });
    
            it("should return false for spare", function() {
                let frame = new Frame(['1', '/']);
                assert.equal(frame.isStrike(), false);
            });
    
            it("should return false for an open frame", function() {
                let frame = new Frame(['1', '3']);
                assert.equal(frame.isStrike(), false);
            });
            
        });

        describe("#getScore()", function(){
            it("should return 10 for spare", function() {
                let frame = new Frame(['1', '/']);
                assert.equal(frame.getScore(), 10);
            });
    
            it("should return 10 for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.getScore(), 10);
            });
    
            it("should return 8 for [5, 3]", function() {
                let frame = new Frame([5, 3]);
                assert.equal(frame.getScore(), 8);
            });
        });
    
        describe("#getFirst()", function(){
            it("should return 1 for [1,2]", function() {
                let frame = new Frame(['1', '2']);
                assert.equal(frame.getFirst(), 1);
            });
    
            it("should return 10 for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.getFirst(), 10);
            });
    
            
        });
    
        describe("#getSecond()", function(){
            it("should return 2 for [1,2]", function() {
                let frame = new Frame(['1', '2']);
                assert.equal(frame.getSecond(), 2);
            });
    
            it("should return undefined for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.getSecond(), undefined);
            });
        });
    
        describe("#size()", function(){
            it("should return 2 for [1,2]", function() {
                let frame = new Frame(['1', '2']);
                assert.equal(frame.size(), 2);
            });
    
            it("should return 1 for strike", function() {
                let frame = new Frame(['X']);
                assert.equal(frame.size(), 1);
            });
    
            it("should return 3 for triple strike", function() {
                let frame = new Frame(['X', 'X', 'X']);
                assert.equal(frame.size(), 3);
            });
        });
    });
});