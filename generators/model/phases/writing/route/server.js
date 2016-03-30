(function () {
    var path;

    path = require('path');

    /**
     * Generates the code for the model.
     *
     * @param {Object} self The generator context.
     * @param {Object} scope The scope object.
     * @param {Object} answers The answers hash.
     * @param {Object} model The model.
     * @returns {string} The JavaScript code for the model.
     */
    function generateModelCode(self, scope, answers, model) {
        var fns, requireDir, url;
        requireDir = require('require-dir');
        fns = requireDir(path.join(self.sourceRoot(), 'route/server/fns'));
        url = scope.global.naming.urlPlural(model.name);

        return [
            '\n\n' + "router.get('" + url + "', " + fns.getMany(scope, model, answers) + ");",
            '\n' + "router.get('" + url + "/:id', " + fns.getOne(scope, model, answers) + ");",
            '\n' + "router.post('" + url + "', " + fns.post(scope, model, answers) + ");",
            '\n' + "router.post('" + url + "/:id', " + fns.update(scope, model, answers) + ");",
            '\n' + "router.delete('" + url + "/:id', " + fns.delete(scope, model, answers) + ");"
        ].join('\n');
    }

    /**
     * Generates the code for the server router.
     *
     * @param {Object} self The generator context.
     * @param {Object} scope The scope object.
     * @returns {string} The JavaScript code for the router.
     */
    function generateRoutingCode(self, scope) {
        var answers, models, src;

        answers = self.config.get('answers');
        models = self.config.get('models');
        src = '';

        models.forEach(function (model) {
            src += generateModelCode(self, scope, answers, model);
        });

        return src;
    }

    module.exports = function writeServerRoutes(self, scope) {
        var answers, beautify, codeTemplate, currentDb, dbConfig, headerCode,
            preprocess, routeSrc;
        answers = self.config.get('answers');
        beautify = require('js-beautify');
        preprocess = require('preprocess');
        codeTemplate = self.fs.read(
            path.join(self.sourceRoot(), 'route/server/code.js')
        );
        headerCode = [];
        dbConfig = {};
        currentDb = self.config.get('currentDb');
        switch (answers.db.id) {
            case 'sqlite':
                dbConfig = {
                    client: 'sqlite3',
                    connection: {
                        filename: currentDb
                    },
                    useNullAsDefault: true,
                    debug: true
                };
                headerCode = headerCode.concat([
                    'var db, express, router;',
                    '',
                    "express = require('express');",
                    'router = express.Router();',
                    "knex = require('knex');",
                    "db = knex(" + JSON.stringify(dbConfig)  + ");"
                ]);
                break;
            case 'mysql':
                dbConfig = "{client:'mysql',connection:require('./../../../mysql.json'),useNullAsDefault:true,debug:true}";

                headerCode = headerCode.concat([
                    'var db, express, knex, router;',
                    '',
                    "express = require('express');",
                    'router = express.Router();',
                    "knex = require('knex');",
                    "db = knex(" + dbConfig + ");"
                ]);
                break;
        }
        headerCode = headerCode.join('\n');
        routeSrc = preprocess.preprocess(codeTemplate, {
            headerCode: headerCode,
            bodyCode: generateRoutingCode(self, scope).trim()
        }, {
            type: 'js'
        });
        self.conflicter.force = true;
        self.fs.write(
            self.destinationPath('src/components/router/api.js'),
            beautify(routeSrc)
        );
        self.conflicter.force = self.options.force;
    };
})();
