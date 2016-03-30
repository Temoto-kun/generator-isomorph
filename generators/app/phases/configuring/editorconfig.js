(function () {
    var options, path;

    // Change these options if you want. Leave it intact (suggested).
    options = {
        eol: 'lf',
        indentSize: {
            markup: 2,
            script: 4,
            text: 8
        }
    };

    path = require('path');

    module.exports = function (self, scope) {
        self.fs.write(
            self.destinationPath('.editorconfig'),
            [
                'root = true',
                '',
                '[*]',
                'end_of_line = ' + options.eol,
                'insert_final_newline = true',
                'charset = utf-8',
                'indent_style = space',
                'indent_size = ' + options.indentSize.text,
                '',
                '[*.{htm,html,ejs,jade,scss,sass,css,styl,json}]',
                'indent_size = ' + options.indentSize.markup,
                '',
                '[*.{js,jsx,coffee}]',
                'indent_size = ' + options.indentSize.script
            ].join('\n')
        );
    };
})();
