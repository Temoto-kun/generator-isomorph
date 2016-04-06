(function () {
    module.exports = function updateFn(scope, model, answers) {
        var G, UPDATE, modelInst, stmt, tableName;
        G = scope.global;
        modelInst = new G.Model(model);
        tableName = G.Querying.Tables(modelInst);
        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':
                stmt = stmt.concat([
                    "db(" + tableName + ")",
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
