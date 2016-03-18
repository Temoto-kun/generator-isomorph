(function () {
    var db, sqlite;

    sqlite = require('sqlite3');
    db = new sqlite.Database(':memory:');

    module.exports = function (model, answers) {
        var GET;

        switch (answers.db.id) {
            case 'sqlite':
                GET = new Function('return function GET(req, res, next) {' +
                    'db.serialize(function () {' +
                        "db.all('SELECT * FROM " + model.name + "', function (err, rows) {" +
                            "res.json({ status: 'ok', data: rows });" +
                        '});' +
                    '});' +
                '}');

                return GET();
        }
    };
})();
