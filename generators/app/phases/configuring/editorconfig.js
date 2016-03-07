(function () {
    module.exports = function (self) {
        self.fs.copyTpl(
            __dirname + '/../../templates/editorconfig.ejs',
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
