var output = require('../output');

module.exports.run = function(params, storage) {
    if (params.length > 0) {
        output.error('Invalid parameters: Init command takes 0 parameters.');
    }

    try {
        var dirpath = storage.init();
        output.info('Initialized task database at ' + dirpath);
    } catch (err) {
        output.error('Initialization failed: ' + err.message);
    }
};
