(function () {
    var naming;

    naming = require('./../../../../common/utils/naming');

    module.exports = function (model, answers) {
        var GET_ONE, stmt;

        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':

                stmt = stmt.concat([
                    "db('" + naming.tableName(model.name) + "')",
                        ".where('id', req.params.id)",
                        '.then(function (result) {',
                            'res.json(result);',
                        '});'
                ]);
                stmt.unshift('return function GET_ONE(req, res, next) {');
                stmt.push('};');

                GET_ONE = new Function(stmt.join('\n'));
        }

        return GET_ONE();
    };
})();
