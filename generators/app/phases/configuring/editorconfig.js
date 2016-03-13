(function () {
    var path;

    path = require('path');

    module.exports = function (self) {
        self.fs.copyTpl(
            path.resolve(__dirname, '../../templates/editorconfig.ejs'),
            self.destinationPath('.editorconfig'),
            {
                eol: 'lf',
                indentSize: {
                    markup: 2,
                    script: 4
                }
            }
        );
    };
})();
