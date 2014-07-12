module.exports.debug = function(message) {
    if (taskcmd.env == 'development') {
        console.log('[debug] ' + message);
    }
};

module.exports.print = function(message) {
    console.log(message);
};

module.exports.error = function(err) {
    console.error('[error] ' + err);
    process.exit(1);
}

module.exports.exit = function() {
    process.exit(0);
}