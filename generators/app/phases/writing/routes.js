(function () {
    var path;

    path = require('path');

    module.exports = function (self) {
        self.fs.copy(
            path.join(self.sourceRoot(), 'express/src/components/router/views/server.js'),
            self.destinationPath('src/components/router/views/server.js')
        );
    };
})();
