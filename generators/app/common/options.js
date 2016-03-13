(function () {
    var Inquirer, npmDeps;

    Inquirer = require('inquirer');

    npmDeps = {
        angular1: require('./npm-deps/angular1.json'),
        react: require('./npm-deps/react.json'),
        polymer: require('./npm-deps/polymer.json')
    };

    module.exports = [
        {
            name: 'indented',
            desc: 'Indicates that the project should use bracket-free syntax.',
            message: 'Would you like indented syntax for your project (i.e. use Jade, CoffeeScript, and indented Sass syntax?',
            type: 'confirm',
            default: false
        },
        {
            name: 'js',
            desc: 'Selects the JavaScript framework to use.',
            message: 'Which JavaScript framework would you like to use?',
            type: 'list',
            choices: [
                {
                    name: 'React + JSX',
                    value: {
                        id: 'react',
                        npm: npmDeps.react.main
                    }
                },
                {
                    name: 'Angular 1.x',
                    value: {
                        id: 'angular1',
                        npm: npmDeps.angular1.main,
                        ng: [
                            'ngAria',
                            'ui.router'
                        ]
                    }
                },
                {
                    name: 'Polymer',
                    value: {
                        id: 'polymer',
                        npm: npmDeps.polymer.main
                    }
                }
            ]
        },
        {
            name: 'ng-deps',
            desc: 'Selects the Angular modules to use.',
            message: 'Please select which Angular modules you want to include.',
            type: 'checkbox',
            choices: [
                {
                    name: 'ngSanitize',
                    value: {
                        npm: npmDeps.angular1.plugins.ngSanitize,
                        ng: 'ngSanitize'
                    }
                },
                {
                    name: 'ngCookies',
                    value: {
                        npm: npmDeps.angular1.plugins.ngCookies,
                        ng: 'ngCookies'
                    }
                },
                {
                    name: 'ngAnimate',
                    value: {
                        npm: npmDeps.angular1.plugins.ngAnimate,
                        ng: 'ngAnimate'
                    }
                },
                {
                    name: 'ngMessages',
                    value: {
                        npm: npmDeps.angular1.plugins.ngMessages,
                        ng: 'ngMessages'
                    }
                },
                {
                    name: 'A8M Filters',
                    value: {
                        npm: npmDeps.angular1.plugins.a8mFilters,
                        ng: 'a8m.filter'
                    }
                }
            ],
            when: function (answers) {
                return (answers['js'].id === 'angular1');
            }
        },
        {
            name: 'ng-i18n',
            desc: 'Selects the I18N-specific Angular module to use.',
            message: 'Please select which Angular I18N module you want to include.',
            type: 'list',
            choices: [
                {
                    name: 'ngI18N',
                    value: {
                        npm: npmDeps.angular1.plugins.ngI18N,
                        ng: 'ngI18n'
                    }
                },
                {
                    name: 'Angular Translate',
                    value: {
                        npm: npmDeps.angular1.plugins.angularTranslate,
                        ng: 'pascalprecht.translate'
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id === 'angular1');
            }
        },
        {
            name: 'ng-rest',
            desc: 'Selects the REST resource library to use for Angular.',
            type: 'list',
            message: 'Which REST resource library would you like to use?',
            choices: [
                {
                    name: 'ngResource',
                    value: {
                        npm: npmDeps.angular1.plugins.ngResource,
                        ng: 'ngResource'
                    }
                },
                {
                    name: 'Restangular',
                    value: {
                        npm: npmDeps.angular1.plugins.restangular,
                        ng: 'Restangular'
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id === 'angular1');
            }
        },
        {
            name: 'db',
            desc: 'Selects the database engine to use.',
            type: 'list',
            message: 'Which database would you like to use?',
            choices: [
                {
                    id: 'sqlite',
                    name: 'SQLite',
                    value: {
                        npm: {
                            save: 'sqlite3'
                        }
                    }
                },
                {
                    id: 'firebase',
                    name: 'Firebase',
                    value: {
                        npm: {
                            save: 'firebase'
                        }
                    }
                },
                {
                    id: 'mysql',
                    name: 'MySQL',
                    value: {
                        npm: {
                            save: 'mysql'
                        }
                    }
                },
                {
                    id: 'indexeddb',
                    name: 'IndexedDB',
                    value: {
                        npm: {
                            save: 'indexed-db'
                        }
                    }
                },
                {
                    id: 'localstorage',
                    name: 'LocalStorage',
                    value: {
                        npm: {
                            save: 'localstorage'
                        }
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id !== 'angular1');
            }
        },
        {
            name: 'db',
            desc: 'Selects the database engine to use.',
            type: 'list',
            message: 'Which database would you like to use?',
            choices: [
                {
                    id: 'sqlite',
                    name: 'SQLite',
                    value: {
                        npm: {
                            save: 'sqlite3'
                        }
                    }
                },
                {
                    id: 'firebase',
                    name: 'Firebase',
                    value: {
                        npm: {
                            save: npmDeps.angular1.plugins.angularfire
                        },
                        ng: 'firebase'
                    }
                },
                {
                    name: 'MySQL',
                    value: {
                        npm: {
                            save: 'mysql'
                        }
                    }
                },
                {
                    name: 'IndexedDB',
                    value: {
                        npm: {
                            save: 'indexed-db'
                        }
                    }
                },
                {
                    name: 'LocalStorage (using ngStorage)',
                    value: {
                        npm: npmDeps.angular1.plugins.ngStorage,
                        ng: 'ngStorage'
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id === 'angular1');
            }
        },
        {
            name: 'css',
            desc: 'Selects the CSS framework to use.',
            type: 'list',
            message: 'Which CSS framework would you like to use?',
            choices: [
                {
                    name: 'Bootstrap',
                    value: {
                        npm: {
                            save: 'bootstrap-sass'
                        }
                    }
                },
                {
                    name: 'Foundation',
                    value: {
                        npm: {
                            save: 'foundation'
                        }
                    }
                },
                {
                    name: 'Material Design Lite',
                    value: {
                        npm: {
                            save: 'md-lite'
                        }
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id !== 'angular1');
            }
        },
        {
            name: 'css',
            desc: 'Selects the CSS framework to use.',
            type: 'list',
            message: 'Which CSS framework would you like to use?',
            choices: [
                {
                    name: 'Bootstrap (with Angular UI Bootstrap)',
                    value: {
                        npm: npmDeps.angular1.plugins.uiBootstrap,
                        ng: 'ui.bootstrap'
                    }
                },
                {
                    name: 'Foundation (with Angular Foundation)',
                    value: {
                        npm: npmDeps.angular1.plugins.foundation,
                        ng: 'mm.foundation'
                    }
                },
                {
                    name: 'Angular Material',
                    value: {
                        npm: npmDeps.angular1.plugins.angularMaterial,
                        ng: 'ngMaterial'
                    }
                },
                {
                    name: 'Material Design Lite',
                    value: {
                        npm: {
                            save: 'md-lite'
                        }
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ],
            when: function (answers) {
                return (answers['js'].id === 'angular1');
            }
        },
        {
            name: 'code-review',
            desc: 'Selects the code reviewer to use.',
            type: 'list',
            message: 'Which code reviewer do you want to use?',
            choices: [
                {
                    name: 'JSCS',
                    value: {
                        id: 'jscs',
                        npm: {
                            saveDev: ['jscs']
                        }
                    }
                },
                {
                    name: 'ESLint',
                    value: {
                        id: 'eslint',
                        npm: {
                            saveDev: ['eslint']
                        }
                    }
                },
                {
                    name: 'JSLint',
                    value: {
                        id: 'jslint',
                        npm: {
                            saveDev: ['jslint']
                        }
                    }
                },
                {
                    name: 'JSHint',
                    value: {
                        id: 'jshint',
                        npm: {
                            saveDev: ['jshint']
                        }
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ]
        },
        {
            name: 'testing',
            desc: 'Selects the test framework to use.',
            type: 'list',
            message: 'Which test framework do you want to use?',
            choices: [
                {
                    name: 'Karma',
                    value: {
                        npm: {
                            saveDev: ['karma']
                        }
                    }
                },
                {
                    name: 'Jasmine',
                    value: {
                        npm: {
                            saveDev: ['jasmine']
                        }
                    }
                },
                {
                    name: 'Mocha',
                    value: {
                        npm: {
                            saveDev: ['mocha']
                        }
                    }
                },
                {
                    name: 'Chai',
                    value: {
                        npm: {
                            saveDev: ['chai']
                        }
                    }
                },
                new Inquirer.Separator(),
                {
                    name: 'None',
                    value: null
                }
            ]
        }
        //,
        /* {
         name: 'postcss',
         message: 'Would you like to use PostCSS?',
         type: 'confirm',
         default: false
         }, */
        //{
        //    name: 'mobile',
        //    desc: 'Sets if the project should be mobile-friendly.',
        //    type: 'confirm',
        //    message: 'Would you like to add support for mobile devices?',
        //    default: true
        //},
        //{
        //    name: 'license',
        //    desc: 'Selects the license to apply to the project.',
        //    type: 'list',
        //    message: 'Which license would you like to apply to your project?',
        //    choices: [
        //        {
        //            name: 'GNU Public License 3.0',
        //            value: 'GPL-3.0'
        //        },
        //        {
        //            name: 'GNU Public License 2.0',
        //            value: 'GPL-2.0'
        //        },
        //        {
        //            name: 'GNU Lesser Public License 3.0',
        //            value: 'LGPL-3.0'
        //        },
        //        {
        //            name: 'Apache License 2.0',
        //            value: 'Apache-3.0'
        //        },
        //        {
        //            name: 'ISC License',
        //            value: 'ISC'
        //        },
        //        {
        //            name: 'MIT License',
        //            value: 'MIT'
        //        },
        //        {
        //            name: 'No License',
        //            value: 'UNLICENSED'
        //        },
        //        {
        //            name: 'Skip this step',
        //            value: null
        //        }
        //    ]
        //}
    ];
})();
