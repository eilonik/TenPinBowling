const readline = require("readline");
// require('events').EventEmitter.defaultMaxListeners = 80;

const createPrompt = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// recieves an input from stdin and executes on cb.
// repeats untill cb returns true

const read = (interface, question, cb, after = null) => {
    interface.setPrompt(question + " >");
    interface.prompt();
    interface.on('line', (input) => {
        done = cb({input, interface});
        if (!done) {
            interface.prompt();
        } else {
            interface.close();
            if (after) {
                after(done);
            }
        }  
    });    
};

module.exports.read = read;
module.exports.createPrompt = createPrompt;