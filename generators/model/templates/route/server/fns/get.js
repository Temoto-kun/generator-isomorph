(function () {
    var db, sqlite;

    sqlite = require('sqlite3');
    db = new sqlite.Database(':memory:');

    module.exports = function (model, answers) {
        var GET;

        switch (answers.db.id) {
            case 'sqlite':
                GET = new Function([
                    'return function GET(req, res, next) {',
                        'var cmd;',
                        '',
                        'cmd = squel.select()',
                            ".from('" + model.name + "');",
                        '',
                        'db.serialize(function () {',
                            "db.all(cmd.toString(), function (err, rows) {",
                                "res.json(rows);",
                            '});',
                        '});',
                    '}'
                ].join('\n'));

                return GET();
        }
    };
})();
