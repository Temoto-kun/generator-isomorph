(function () {
    // TODO enumerate auto-generated file and set them as readonly (e.g. routes, config, api, models)
    // models <-> api <-> client

    var generators, self, prompts, answers, deps, devDeps, isIndentedSass, npm;

    generators = require('yeoman-generator');
    prompts = require('./prompts');
    deps = [];
    devDeps = [];
    npm = require('npm');

    function loadInitialDeps() {
        deps = [
            'express',
            'body-parser',
            'cookie-parser',
            'debug',
            'morgan',
            'serve-favicon',
            'scut',
            'webpack' // TODO get express middleware

            // TODO optimizers for images, svg, fonts
        ];
    }

    function setupJsFramework(framework) {
        switch (framework) {
            case 'react':
                deps = deps.concat([
                    'react',
                    'react-dom',
                    'react-router',
                    'babel',
                    'babel-preset-es2015',
                    'babel-preset-react'
                ]);
                break;
            case 'angular1':
                deps = deps.concat([
                    'angular',
                    'ngAria',
                    'angular-ui-router' // TODO have another choice for Angular plugins (e.g. angular-cookie, angular-)
                ]);
                break;
        }
    }

    function setupPreprocessors(isIndented) {
        isIndentedSass = isIndented;

        if (isIndented) {
            deps = deps.concat([
                'jade',
                (answers.js !== 'react' ? 'coffee-script' : 'cjsx')
            ]);
            // TODO implement Jade, CoffeeScript, and indented Sass
            return;
        }
        deps = deps.concat([
            'ejs'
        ]);
    }

    function setupAngularDeps(selectedDeps) {
        selectedDeps.forEach(function (dep) {
            switch (dep) {
                case 'sanitize':
                    deps.push('ngSanitize');
                    break;
                case 'cookies':
                    deps.push('ngCookies');
                    break;
                case 'animate':
                    deps.push('ngAnimate');
                    break;
                case 'messages':
                    deps.push('ngMessages');
                    break;
                case 'filters':
                    deps.push('angular-filter');
                    break;
            }
        });
    }

    function setupRestLibrary(library) {
        switch (library) {
            case 'ng-resource':
                deps.push('ngResource');
                break;
            case 'restangular':
                deps.push('restangular');
                break;
        }
    }

    function setupDatabase(database) {
        switch (database) {
            case 'sqlite':
                deps.push('sqlite3');
                break;
            case 'firebase':
                deps.push('firebase');
                break;
            case 'mysql':
                deps.push('mysql');
                break;
            case 'indexed-db':
                break;
            case 'localstorage':
                if (answers.js === 'angular1') {
                    deps.push('ngstorage');
                }
                break;
        }
    }

    function setupCssFramework(framework) {
        switch (framework) {
            case 'bootstrap':
                deps.push('bootstrap-sass');
                if (answers.js === 'angular1') {
                    deps.push('angular-ui-bootstrap');
                }
                break;
            case 'foundation':
                deps.push('foundation');
                if (answers.js === 'angular1') {
                    deps.push('angular-mm-foundation');
                }
                break;
            case 'ng-material':
                deps.push('ngMaterial');
                break;
            case 'md-lite':
                deps.push('material-design-lite');
                break;
        }
    }

    function setupPostCss(isIncluded) {
        if (!isIncluded) {
            return;
        }

        deps.push('postcss');
    }

    function setupPostCssPlugins(plugins) {

        // TODO PostCSS plugins that emulate Sass:
        // postcss-functions: https://github.com/andyjansson/postcss-functions
        // postcss-nested: https://github.com/postcss/postcss-nested
        // https://github.com/andyjansson/postcss-sassy-mixins
        // https://github.com/jedmao/postcss-nested-vars
        // https://github.com/travco/postcss-extend

        // take a look at this: https://github.com/postcss/postcss-scss

        // plus other stuff:
        // postcss-nested-props: https://github.com/jedmao/postcss-nested-props
        // https://github.com/jonathantneal/postcss-short-color
        // https://github.com/jonathantneal/postcss-short-font-size
        // https://github.com/jonathantneal/postcss-short-data

        // https://github.com/LestaD/postcss-define-units (for grid system perhaps?

        // TODO configure PostCSS to be able to import Sass

    }

    function setupForMobile(isSupported) {
        if (!isSupported) {
            return;
        }

        if (answers.js === 'angular1') {
            deps.push('ngTouch');
        }
    }

    function setupGulp() {
        // TODO make user choose build system
        devDeps = [
            'gulp',
            'gulp-plumber'
        ]
    }

    // TODO TDD: setup E2E and unit testing (Jasmine, Protractor, Karma, Chai, Mocha)

    module.exports = generators.Base.extend({
        constructor: function () {
            self = this;

            generators.Base.apply(self, arguments);

            prompts.forEach(function (prompt) {
                self.option(prompt.name);
            });
        },

        prompting: function () {
            var done;

            done = self.async();

            prompts.unshift({
                name: 'name',
                message: 'Type in your project name.',
                type: 'input',
                required: true,
                default: self.appname
            });

            prompts.unshift({
                name: 'description',
                message: 'Describe what your project does.',
                type: 'input',
                optional: true
            });

            self.prompt(prompts, function (promptAnswers) {
                answers = promptAnswers;
                done();
            });
        },

        configuring: function () {
            loadInitialDeps();
            setupJsFramework(answers.js);
            setupPreprocessors(answers.indented);

            if (!!answers.ngdeps) {
                setupAngularDeps(answers.ngdeps);
            }

            if (!!answers.rest) {
                setupRestLibrary(answers.rest);
            }

            if (!!answers.db) {
                setupDatabase(answers.db);
            }

            if (!!answers.css) {
                setupCssFramework(answers.css);
            }

            setupPostCss(answers.postcss);
            setupPostCssPlugins(answers.postcssplugins);

            setupForMobile(answers.mobile);

            // TODO select License

            // TODO setup docs?
        },

        writing: function () {
            // TODO write gitignore, editorconfig

            var fs, packageJson;

            fs = require('fs');

            packageJson = {
                name: answers.name,
                version: '0.0.0'
            };

            if (!!answers.description && answers.description.trim().length > 0) {
                packageJson.description = answers.description;
            }

            // TODO prepare scripts
            packageJson.scripts = {
                'build': 'gulp',
                'build:mobile': 'gulp',
                'serve': 'gulp serve',
                'test': 'gulp test'
            };

            // TODO make user select code review (JSCS, JSHint, JSLint, ESLint)
            packageJson.jscsConfig = {

            };

            packageJson.eslintConfig = {

            };

            fs.writeFile('package.json', JSON.stringify(packageJson), function (err) {

            });

            fs.writeFile('README', [answers.name, answers.description].join('\n\n') + '\n', function (err) { // TODO add LICENSE section in README

            });
        },

        install: function () {
            var installArgs;

            installArgs = ['-S'].concat(deps);

            npm.commands.install(installArgs, function (err, data) {
                if (!!err) {
                    throw err;
                }
            });
        },

        end: function () {
        }
    });
})();
