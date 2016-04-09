(function () {
    module.exports = function deleteFn(scope, modelInst, answers) {
        var DELETE, G, stmt, tableName;
        G = scope.global;
        tableName = G.Querying.Tables(modelInst);
        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':
                stmt = stmt.concat([
                    "db(" + tableName + ")",
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
