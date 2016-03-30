(function () {
    var Generators, requireDir, scope;
    Generators = require('yeoman-generator');
    requireDir = require('require-dir');
    scope = {
        global: requireDir('./../../common', { recurse: true }),
        local: requireDir('./common', { recurse: true })
    };
    module.exports = Generators.Base.extend({
        constructor: function RelationSubgenerator() {
            var self;
            self = this;
            Generators.Base.apply(self, arguments);
            scope.local.options.forEach(function (prompt) {
                self.option(prompt.name, {
                    desc: prompt.desc,
                    required: false
                });
            });
        },
        initializing: function () {
            require('./phases/initializing')(this, scope);
        },
        prompting:    function () {
            require('./phases/prompting')(this, scope);
        },
        configuring:  function () {
            require('./phases/configuring')(this, scope);
        },
        writing:      function () {
            require('./phases/writing')(this, scope);
        },
        conflicts:    function () {
            require('./phases/conflicts')(this, scope);
        },
        install:      function () {
            require('./phases/install')(this, scope);
        },
        end:          function () {
            require('./phases/end')(this, scope);
        }
    });
})();
