(function () {
    module.exports = function getOneFn(scope, modelInst, answers) {
        var G, GET_ONE, attrsStmt, stmt, tableName;
        G = scope.global;
        attrsStmt = G.Querying.Columns(modelInst.getVisibleAttrs());
        tableName = G.Querying.Tables(modelInst);
        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':
                stmt = stmt.concat([
                    "db.select(" + attrsStmt + ")",
                        ".from(" + tableName + ")",
                        ".where('id', req.params.id)",
                        '.then(function (result) {',
                            'db.destroy();',
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
