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
        var fns, naming, requireDir, url;

        requireDir = require('require-dir');
        naming = require('./../../../../../common/naming');

        fns = requireDir(path.join(self.sourceRoot(), 'route/server/fns'));

        url = naming.urlPlural(model.name);

        return [
            '\n\n' + "router.get('" + url + "', " + fns.getMany(model, answers) + ");",
            '\n' + "router.get('" + url + "/:id', " + fns.getOne(model, answers) + ");",
            '\n' + "router.post('" + url + "', " + fns.post(model, answers) + ");",
            '\n' + "router.post('" + url + "/:id', " + fns.update(model, answers) + ");",
            '\n' + "router.delete('" + url + "/:id', " + fns.delete(model, answers) + ");"
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
        var answers, beautify, codeTemplate, currentDb, dbConfig, headerCode, preprocess, routeSrc;

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
                //dbConfig = {
                //    client: 'mysql',
                //    connection: currentDb,
                //    useNullAsDefault: true,
                //    debug: true
                //};

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
            bodyCode: generateRoutingCode(self).trim()
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
