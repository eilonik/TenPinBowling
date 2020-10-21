module.exports.notEmpty = (input) => {
    if (!input) {
        return false;
    }
    if (Array.isArray(input) && input.length === 0) {
        return false;
    }
    return true;
};

module.exports.uniqueArray = (input) => {
    if (!Array.isArray(input)) {
        return false;
    }
    return (new Set(input)).size === input.length;
}