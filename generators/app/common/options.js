(function () {
    var Inquirer;

    Inquirer = require('inquirer');

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
                        npm: {
                            save: [
                                'react',
                                'react-dom',
                                'react-router',
                                'babel',
                                'babel-preset-es2015',
                                'babel-preset-react'
                            ]
                        }
                    }
                },
                {
                    name: 'Angular 1.x',
                    value: {
                        id: 'angular1',
                        npm: {
                            save: [
                                'angular',
                                'angular-aria',
                                'angular-ui-router'
                            ]
                        },
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
                        npm: {
                            save: [
                                'Polymer'
                            ]
                        }
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
                        npm: {
                            save: 'angular-sanitize'
                        },
                        ng: 'ngSanitize'
                    }
                },
                {
                    name: 'ngCookies',
                    value: {
                        npm: {
                            save: 'angular-cookies'
                        },
                        ng: 'ngCookies'
                    }
                },
                {
                    name: 'ngAnimate',
                    value: {
                        npm: {
                            save: 'angular-animate'
                        },
                        ng: 'ngAnimate'
                    }
                },
                {
                    name: 'ngMessages',
                    value: {
                        npm: {
                            save: 'angular-messages'
                        },
                        ng: 'ngMessages'
                    }
                },
                {
                    name: 'A8M Filters',
                    value: {
                        npm: {
                            save: 'angular-filters'
                        },
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
                        npm: {
                            save: 'angular-i18n'
                        },
                        ng: 'ngI18n'
                    }
                },
                {
                    name: 'Angular Translate',
                    value: {
                        npm: {
                            save: 'angular-translate'
                        },
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
                        npm: {
                            save: 'angular-resource'
                        },
                        ng: 'ngResource'
                    }
                },
                {
                    name: 'Restangular',
                    value: {
                        npm: {
                            save: 'restangular'
                        },
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
                    name: 'SQLite',
                    value: {
                        npm: {
                            save: 'sqlite3'
                        }
                    }
                },
                {
                    name: 'Firebase',
                    value: {
                        npm: {
                            save: 'firebase'
                        }
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
                    name: 'SQLite',
                    value: {
                        npm: {
                            save: 'sqlite3'
                        }
                    }
                },
                {
                    name: 'Firebase',
                    value: {
                        npm: {
                            save: 'firebase'
                        }
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
                        npm: {
                            save: 'ngstorage'
                        },
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
                        npm: {
                            save: ['bootstrap-sass', 'angular-bootstrap']
                        },
                        ng: 'ui.bootstrap'
                    }
                },
                {
                    name: 'Foundation (with Angular Foundation)',
                    value: {
                        npm: {
                            save: ['foundation', 'angular-mm-foundation']
                        },
                        ng: 'mm.foundation'
                    }
                },
                {
                    name: 'Angular Material',
                    value: {
                        npm: {
                            save: 'angular-material'
                        },
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
