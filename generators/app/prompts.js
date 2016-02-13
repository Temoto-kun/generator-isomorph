(function () {
    module.exports = [
        {
            "name": "indented",
            "message": "Would you like indented syntax for your project (i.e. use Jade, CoffeeScript, and indented Sass syntax?",
            "type": "confirm",
            "default": false
        },
        {
            "name": "js",
            "message": "Which JavaScript framework would you like to use?",
            "type": "list",
            "choices": [
                {
                    "name": "React + JSX",
                    "value": "react"
                },
                {
                    "name": "Angular 1.x",
                    "value": "angular1"
                },
                {
                    "name": "Polymer",
                    "value": "polymer"
                }
            ]
        },
        {
            "name": "ngdeps",
            "message": "Please select which Angular modules you want to include.",
            "type": "checkbox",
            "choices": [
                {
                    "name": "Sanitize",
                    "value": "sanitize"
                },
                {
                    "name": "Cookies",
                    "value": "cookies"
                },
                {
                    "name": "Animate",
                    "value": "animate"
                },
                {
                    "name": "Messages",
                    "value": "messages"
                },
                {
                    "name": "Filters",
                    "value": "filters"
                }
            ],
            "when": function (answers) {
                return (answers.js === 'angular1');
            }
        },
        {
            "type": "list",
            "name": "rest",
            "message": "Which REST resource library would you like to use?",
            "choices": [
                {
                    "value": "ng-resource",
                    "name": "ngResource"
                },
                {
                    "value": "restangular",
                    "name": "Restangular"
                },
                {
                    "value": null,
                    "name": "None"
                }
            ],
            "when": function (answers) {
                return (answers.js === 'angular1');
            }
        },
        {
            "name": "db",
            "message": "Which database would you like to use?",
            "type": "list",
            "choices": [
                {
                    "name": "SQLite",
                    "value": "sqlite"
                },
                {
                    "name": "Firebase",
                    "value": "firebase"
                },
                {
                    "name": "MySQL",
                    "value": "mysql"
                },
                {
                    "name": "IndexedDB",
                    "value": "indexed-db"
                },
                {
                    "name": "LocalStorage",
                    "value": "localstorage"
                },
                {
                    "name": "None",
                    "value": null
                }
            ]
        },
        {
            "name": "css",
            "message": "Which CSS framework would you like to use?",
            "type": "list",
            "choices": [
                {
                    "name": "Bootstrap",
                    "value": "bootstrap"
                },
                {
                    "name": "Foundation",
                    "value": "foundation"
                },
                {
                    "value": "angular-material",
                    "name": "Angular Material",
                    "when": function (answers) {
                        return (answers.js === "angular1");
                    }
                },
                {
                    "value": "md-lite",
                    "name": "Material Design Lite"
                },
                {
                    "name": "None",
                    "value": null
                }
            ]
        },
        {
            "name": "postcss",
            "message": "Would you like to use PostCSS?",
            "type": "confirm",
            "default": false
        },
        {
            "name": "mobile",
            "message": "Would you like to add support for mobile devices?",
            "type": "confirm",
            "default": true
        }
    ];
})();
