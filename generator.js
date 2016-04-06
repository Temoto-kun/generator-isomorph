(function () {
    var Generators, packageJson, path, requireDir, scope;
    Generators = require('yeoman-generator');
    packageJson = require('./package.json');
    path = require('path');
    requireDir = require('require-dir');
    scope = {
        global: requireDir('./common', { recurse: true })
    };

    module.exports = function (meta) {
        scope.local = requireDir(path.resolve(meta.dir, './common'), { recurse: true });
        Object.keys(meta).forEach(function (key) {
            scope.local[key] = scope.local[key] || meta[key];
        });
        return Generators.Base.extend({
            constructor: function Generator() {
                var self;
                self = this;
                Generators.Base.apply(self, arguments);
                
                scope.local.prompts['default'].forEach(function (prompt) {
                    self.option(prompt.name, {
                        desc: prompt.desc,
                        required: false
                    });
                });

                require('./common/branding/header')(self)({
                    name: meta.dir.slice(meta.dir.lastIndexOf('\\') + 1),
                    author: packageJson.author,
                    desc: meta.desc,
                    color: meta.color
                });
            },
            initializing: function () {
                this.log(' [Initializing...]');
                require(path.resolve(meta.dir, './phases/initializing'))(this, scope);
            },
            prompting: function () {
                require(path.resolve(meta.dir, './phases/prompting'))(this, scope);
            },
            configuring: function () {
                this.log(' [Configuring...]');
                require(path.resolve(meta.dir, './phases/configuring'))(this, scope);
            },
            writing: function () {
                this.log(' [Writing files...]');
                require(path.resolve(meta.dir, './phases/writing'))(this, scope);
            },
            conflicts: function () {
                require(path.resolve(meta.dir, './phases/conflicts'))(this, scope);
            },
            install: function () {
                this.log(' [Installing packages...]');
                require(path.resolve(meta.dir, './phases/install'))(this, scope);
            },
            end: function () {
                var self;
                self = this;

                require(path.resolve(meta.dir, './phases/end'))(self, scope);
                require('./common/branding/footer')(self)({
                    name: meta.dir.slice(meta.dir.lastIndexOf('\\') + 1),
                    author: packageJson.author,
                    desc: meta.desc,
                    color: meta.color
                });
            }
        });
    };
})();
