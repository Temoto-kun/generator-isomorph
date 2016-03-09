(function () {
    var routes;

    module.exports = function (self) {
        routes = self.config.get('routes', []);

        routes.push({
            url: '/',
            method: 'get',
            view: 'index',
            model: 'info',
            options: {
                title: 'Express'
            }
        });

        self.fs.copyTpl('./../../templates/express/src/components/routes/views.js', self.destinationPath('src/components/routes/views.ejs'), {
            routes: routes
        });

        // TODO better adding/deleting of routes

        self.config.set('routes', routes);
    };
})();
