(function () {
    module.exports = function getManyFn(scope, model, answers) {
        var GET_MANY, stmt;

        stmt = [];

        switch (answers.db.id) {
            case 'sqlite':

                stmt = stmt.concat([
                    "knex.select()",
                        ".table('" + scope.global.naming.tableName(model.name) + "')"
                ]);

                if (model.pagination) {
                    stmt = [
                        'var itemsPerPage, page;',
                        'itemsPerPage = req.params.itemsPerPage || 10;',
                        'page = req.params.page || 1;',
                        "db.table('" + scope.global.naming.tableName(model.name) + "')",
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
