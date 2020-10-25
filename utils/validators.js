module.exports.empty = (input) => {
    return (!input || (Array.isArray(input) && input.length === 0));
};

module.exports.hasDuplicates = (input) => {
    return (new Set(input)).size !== input.length;
}