(function () {
    var naming;

    naming = require('./../../../../../../common/naming');

    module.exports = function (model, answers) {
        var UPDATE, stmt;

        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':

                stmt = stmt.concat([
                    "db('" + naming.tableName(model.name) + "')",
                        ".where('id', req.params.id)",
                        ".update(req.body)",
                        '.then(function (result) {',
                            'db.destroy();',
                            'res.json(result);',
                        '});'
                ]);
                stmt.unshift('return function UPDATE(req, res, next) {');
                stmt.push('};');

                UPDATE = new Function(stmt.join('\n'));
        }

        return UPDATE();
    };
})();
