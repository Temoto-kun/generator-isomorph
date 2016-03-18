(function () {
    var db, sqlite;

    sqlite = require('sqlite3');
    db = new sqlite.Database(':memory:');

    module.exports = function (model, answers) {
        switch (answers.db.id) {
            case 'sqlite':
                return function GET(req, res, next) {
                    db.serialize(function () {
                        db.run('SELECT * FROM ' + model.name + ';');

                        // TODO model.name should be resolved here.
                    });
                    res.json({ status: 'ok' });
                };
        }
    };
})();
