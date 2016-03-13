(function () {
    module.exports = function install(self) {
        var nodeModules;

        nodeModules = self.config.get('nodeModules');

        //self.npmInstall(nodeModules.dependencies, { saveDev: false });
        //self.npmInstall(nodeModules.devDependencies, { saveDev: true });
    };
})();
