(function () {
    module.exports = function postFn(scope, model, answers) {
        var G, POST, modelInst, stmt, tableName;
        G = scope.global;
        modelInst = new G.Model(model);
        tableName = G.Querying.Tables(modelInst);
        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':
                stmt = stmt.concat([
                    "db(" + tableName + ")",
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
