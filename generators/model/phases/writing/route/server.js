(function () {
    function composeServerRoutes(self, cb) {
        var beautify, fs, path, routeDir, routeSrc, routes;

        beautify = require('js-beautify');
        fs = require('fs');
        path = require('path');

        routeDir = self.destinationPath('src/components/router/routes');

        routes = self.config.get('routes') || [];

        routeSrc = [
            '(function () {',
            'var express, router;',
            "express = require('express');",
            'router = express.Router();\n'
        ].join('\n');

        routes.forEach(function (route) {
            routeSrc += [
                '\n' + "router.get('" + route.url + "', function (req, res, next) {",
                "res.json({ status: 'ok' });", // TODO get data from database
                "});"
            ].join('\n');

            routeSrc += [
                '\n' + "router.post('" + route.url + "', function (req, res, next) {",
                "res.json({ status: 'ok' });", // TODO get data from database
                "});"
            ].join('\n');
        });

        routeSrc += '\n})();';

        cb(null, beautify(routeSrc));
    }

    module.exports = function writeServerRoutes(self, cb) {
        composeServerRoutes(self, function (err, res) {
            if (!!err) {
                cb(err);
                return;
            }

            self.fs.write(
                self.destinationPath('src/components/router/api.js'),
                res
            );

            cb(null);
        });
    };
})();
