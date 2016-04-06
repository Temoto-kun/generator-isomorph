(function () {
    module.exports = function deleteFn(scope, model, answers) {
        var DELETE, G, modelInst, stmt, tableName;
        G = scope.global;
        modelInst = new G.Model(model);
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
