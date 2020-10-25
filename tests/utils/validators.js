const validators = require('../../utils/validators');
const assert = require('assert');

describe("Validators", function(){
    describe("#empty()", function() {
        it("Should return true for empty input", function() {
            assert.equal(validators.empty(), true);
        });

        it("Should return true for empty string", function() {
            assert.equal(validators.empty(""), true);
        });

        it("Should return true for empty array", function() {
            assert.equal(validators.empty([]), true);
        });
    });

    describe("#hasDuplicates()", function() {
        it("Should return true an array with duplicates", function() {
            assert.equal(validators.hasDuplicates([1,1,2]), true);
        });

        it("Should return false for a unique array", function() {
            assert.equal(validators.hasDuplicates([1,2]), false);
        });

        it("Should return false for an empty array", function() {
            assert.equal(validators.hasDuplicates([]), false);
        });
        it("Should return true for empty strings", function() {
            assert.equal(validators.hasDuplicates([,,]), true);
        });
    });
});
