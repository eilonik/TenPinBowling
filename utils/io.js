const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const read = (question, cb) => {
    rl.question(question, (answer) => {
        cb(answer);
        rl.close();
    })
}

module.exports.read = read;