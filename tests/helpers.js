const assert = require('assert');
module.exports.expectException = function(cb) {
    let exception = null;
    try {
        cb();
    } catch (e) {
        exception = e;
    }
    assert.notEqual(exception, null);
}