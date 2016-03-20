(function () {
    var path;

    path = require('path');

    /**
     * Generates the code for the model.
     *
     * @param {Object} self The generator context.
     * @param {Object} answers The answers hash.
     * @param {Object} model The model.
     * @returns {string} The JavaScript code for the model.
     */
    function generateModelCode(self, answers, model) {
        var fns, requireDir, slug, url;

        requireDir = require('require-dir');
        slug = require('slug');

        fns = requireDir(path.join(self.sourceRoot(), 'route/server/fns'));

        url = slug(model.name);

        return [
            '\n\n' + "router.get('" + url + "', " + fns.get(model, answers) + ");",
            '\n' + "router.post('" + url + "', " + fns.post(model, answers) + ");",
            '\n' + "router.delete('" + url + "', " + fns.delete(model, answers) + ");"
        ].join('\n');
    }

    /**
     * Generates the code for the server router.
     *
     * @param {Object} self The generator context.
     * @returns {string} The JavaScript code for the router.
     */
    function generateRoutingCode(self) {
        var answers, models, src;

        answers = self.config.get('answers');
        models = self.config.get('models');
        src = '';

        models.forEach(function (model) {
            src += generateModelCode(self, answers, model);
        });

        return src;
    }

    module.exports = function writeServerRoutes(self) {
        var answers, beautify, codeTemplate, headerCode, preprocess, routeSrc;

        answers = self.config.get('answers');
        beautify = require('js-beautify');
        preprocess = require('preprocess');
        codeTemplate = self.fs.read(
            path.join(self.sourceRoot(), 'route/server/code.js')
        );
        headerCode = [];
        switch (answers.db.id) {
            case 'sqlite':
                headerCode = headerCode.concat([
                    'var db, express, router, sqlite, squel;',
                    '',
                    "express = require('express');",
                    'router = express.Router();',
                    "squel = require('squel');",
                    '',
                    "sqlite = require('sqlite3').verbose();",
                    "db = new sqlite.Database('" + self.config.get('currentDb').replace('\\', '\\\\') + "');"
                ]);
                break;
            case 'mysql':
                headerCode = headerCode.concat([
                    'var db, express, mysql, router, squel;',
                    '',
                    "express = require('express');",
                    'router = express.Router();',
                    "squel = require('squel');",
                    '',
                    "mysql = require('mysql');",
                    "db = mysql.createConnection(require('./mysql.json'));", // TODO create mysql.json in writing phase of app generator
                    '',
                    'db.connect();'
                ]);
                break;
        }
        headerCode = headerCode.join('\n');
        routeSrc = preprocess.preprocess(codeTemplate, {
            headerCode: headerCode,
            bodyCode: generateRoutingCode(self).trim()
        }, {
            type: 'js'
        });

        self.fs.write(
            self.destinationPath('src/components/router/api.js'),
            beautify(routeSrc)
        );
    };
})();
