(function () {
    module.exports = function deleteFn(scope, model, answers) {
        var DELETE, stmt;

        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':

                stmt = stmt.concat([
                    "db('" + scope.global.naming.tableName(model.name) + "')",
                        ".where('id', req.params.id)",
                        ".del()",
                        '.then(function (result) {',
                            'db.destroy();',
                            'res.json(result);',
                        '});'
                ]);
                stmt.unshift('return function DELETE(req, res, next) {');
                stmt.push('};');

                DELETE = new Function(stmt.join('\n'));
        }

        return DELETE();
    };
})();
