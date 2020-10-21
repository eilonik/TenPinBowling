const validators = require('../../utils/validators');
const assert = require('assert');

describe("Validators", function(){
    describe("#notEmpty()", function() {
        it("Should return false for empty input", function() {
            assert.equal(validators.notEmpty(), false);
        });

        it("Should return false for empty string", function() {
            assert.equal(validators.notEmpty(""), false);
        });

        it("Should return false for empty array", function() {
            assert.equal(validators.notEmpty([]), false);
        });
    });

    describe("#uniqueArray()", function() {
        it("Should return false an array with duplicates", function() {
            assert.equal(validators.uniqueArray([1,1,2]), false);
        });

        it("Should return true for a unique array", function() {
            assert.equal(validators.uniqueArray([1,2]), true);
        });

        it("Should return true for an empty array", function() {
            assert.equal(validators.uniqueArray([]), true);
        });
    });
});
