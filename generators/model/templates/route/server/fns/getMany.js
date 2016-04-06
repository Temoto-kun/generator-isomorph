(function () {
    module.exports = function getManyFn(scope, model, answers) {
        var G, GET_MANY, attrsStmt, modelInst, stmt, tableName;
        G = scope.global;
        modelInst = new G.Model(model);
        attrsStmt = G.Querying.Columns(modelInst.getVisibleAttrs());
        tableName = G.Querying.Tables(modelInst);
        stmt = [];
        
        switch (answers.db.id) {
            case 'sqlite':
                stmt = stmt.concat([
                    "db.select(" + attrsStmt + ")",
                        ".from(" + tableName + ")"
                ]);

                if (model.pagination) {
                    stmt = [
                        'var itemsPerPage, page;',
                        'itemsPerPage = req.params.itemsPerPage || 10;',
                        'page = req.params.page || 1;',
                        "db.table(" + tableName + ")",
                            ".select(db.raw('count(*) as totalItems, (count(*) / ?) as totalPages', itemsPerPage))",
                            '.then(function (counts) {'
                    ].concat(stmt);

                    stmt = stmt.concat([
                            '.offset((page - 1) * itemsPerPage)',
                            '.limit(itemsPerPage)',
                            '.then(function (rows) {',
                                'db.destroy();',
                                'res.json({ total_items: counts.totalItems, total_pages: counts.totalPages, items: rows, page: page });',
                            '});',
                        '});'
                    ]);
                    stmt.unshift('return function GET_MANY(req, res, next) {');
                    stmt.push('};');

                    GET_MANY = new Function(stmt.join('\n'));

                    return GET_MANY();
                }

                stmt = stmt.concat([
                    '.then(function (rows) {',
                        'res.json(rows);',
                    '});'
                ]);
                stmt.unshift('return function GET_MANY(req, res, next) {');
                stmt.push('};');

                GET_MANY = new Function(stmt.join('\n'));
        }

        return GET_MANY();
    };
})();
