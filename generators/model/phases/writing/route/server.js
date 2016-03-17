(function () {
    var fns, requireDir;

    requireDir = require('require-dir');

    fns = requireDir('./server');

    function generateRouteCode(self, route) {
        var answers;

        answers = self.config.get('answers');

        // TODO use template files and preprocess module instead of appending strings.

        return [
            '\n\n' + "router.get('" + route.url + "', " + fns.get(answers) + ");",
            '\n' + "router.post('" + route.url + "', " + fns.post(answers) + ");",
            '\n' + "router.delete('" + route.url + "', " + fns.delete(answers) + ");"
        ].join('\n');
    }

    function generateLoadDatabaseCode(self) {
        var answers, routeSrc;

        answers = self.config.get('answers');

        if (!answers) {
            return '';
        }

        switch (answers.db.id) {
            case 'sqlite':
                routeSrc = "\ndb = require('sqlite3');";
                break;
            case 'nosql':
                routeSrc = "\ndb = require('nosql');";
        }

        return routeSrc;
    }

    function generateRoutingCode(self) {
        var beautify, models, newRoute, routeSrc, routes;

        beautify = require('js-beautify');
        models = self.config.get('models');
        newRoute = models.slice(-1)[0];
        routes = self.config.get('routes') || [];
        routeSrc = [
            '(function () {',
            'var express, router, db;',
            "express = require('express');",
            'router = express.Router();\n'
        ].join('\n');
        routeSrc += generateLoadDatabaseCode(self);
        routes.push({
            name: newRoute.name,
            url: '/' + newRoute.name.toLowerCase().replace(/\s+/g, '-')
        });
        routes.forEach(function (route) {
            routeSrc += generateRouteCode(self, route);
        });
        routeSrc += '\n})();';
        self.config.set('routes', routes);

        return beautify(routeSrc);
    }

    function composeServerRoutes(self) {
        self.fs.write(
            self.destinationPath('src/components/router/api.js'),
            generateRoutingCode(self)
        );
    }

    module.exports = function writeServerRoutes(self) {
        composeServerRoutes(self);
    };
})();
