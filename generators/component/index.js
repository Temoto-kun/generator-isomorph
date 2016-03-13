(function () {
    var Generators, self;

    Generators = require('yeoman-generator');

    module.exports = Generators.Base.extend({
        constructor: function ComponentGenerator() {
            self = this;

            Generators.Base.apply(self, arguments);

            require('./common/options').forEach(function (prompt) {
                self.option(prompt.name, {
                    desc: prompt.desc,
                    required: false
                });
            });
        },
        initializing: function () { require('./phases/initializing')(self); },
        prompting:    function () { require('./phases/prompting')(self);    },
        configuring:  function () { require('./phases/configuring')(self);  },
        writing:      function () { require('./phases/writing')(self);      },
        conflicts:    function () { require('./phases/conflicts')(self);    },
        install:      function () { require('./phases/install')(self);      },
        end:          function () { require('./phases/end')(self);          }
    });
})();
