(function () {
    var Generators;

    Generators = require('yeoman-generator');

    module.exports = Generators.Base.extend({
        constructor: function () {
            var self;
            self = this;

            Generators.Base.apply(self, arguments);

            require('./common/options').forEach(function (prompt) {
                self.option(prompt.name, {
                    desc: prompt.desc,
                    required: false
                });
            });
        },
        initializing: function () {
            require('./phases/initializing')(this);
        },
        prompting: function () {
            require('./phases/prompting')(this);
        },
        configuring: function () {
            require('./phases/configuring')(this);
        },
        writing: function () {
            require('./phases/writing')(this);
        },
        conflicts: function () {
            require('./phases/conflicts')(this);
        },
        install: function () {
            require('./phases/install')(this);
        },
        end: function () {
            require('./phases/end')(this);
        }
    });
})();
