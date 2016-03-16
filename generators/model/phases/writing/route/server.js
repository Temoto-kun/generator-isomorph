(function () {
    function routeGetCode(req, res, next) {
        res.json({ status: 'ok' });
    }

    function routePostCode(req, res, next) {
        res.json({ status: 'ok' });
    }

    function generateRouteCode(route) {
        return [
            '\n\n' + "router.get('" + route.url + "', " + routeGetCode + ");",
            '\n' + "router.post('" + route.url + "', " + routePostCode + ");"
        ].join('\n');
    }

    function generateLoadDatabaseCode(self) {
        var answers, routeSrc;

        answers = self.config.get('answers');

        if (!answers) {
            return '';
        }

        routeSrc = "\ndb = require('" + answers.db.id + "');";

        return routeSrc;
    }

    function generateRoutingCode(self) {
        var beautify, newRoute, routeSrc, routes;

        beautify = require('js-beautify');

        newRoute = self.config.get('last-model');

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
            routeSrc += generateRouteCode(route);
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
