(function () {
    var naming;

    naming = require('./../../../../common/utils/naming');

    module.exports = function (model, answers) {
        var POST, stmt;

        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':

                stmt = stmt.concat([
                    "db('" + naming.tableName(model.name) + "')",
                        '.insert(req.body)',
                        '.then(function (ids) {',
                            'db.destroy();',
                            'res.json({ ids: ids });',
                        '});'
                ]);
                stmt.unshift('return function POST(req, res, next) {');
                stmt.push('};');

                POST = new Function(stmt.join('\n'));
        }

        return POST();
    };
})();
