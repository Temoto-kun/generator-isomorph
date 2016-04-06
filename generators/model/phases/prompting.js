(function () {
    var done, modelOrder, prompts;
    modelOrder = 0;

    /**
     * Makes an attribute from an answers hash.
     * @param {Object} answers The answers hash.
     * @returns {Object} The attribute object.
     */
    function makeAttr(answers) {
        var attr;

        attr = {
            name: answers['attr-name'].trim(),
            nullable: answers['attr-nullable'],
            typeBase: answers['attr-type-base']
        };

        switch (answers['attr-type-base']) {
            case 'boolean':
                attr.type = 'BOOLEAN';
                break;
            case 'integer':
            case 'real':
            case 'datetime':
                attr.type = answers['attr-type'];
                break;
            case 'string':
                if (!!answers['attr-length']) {
                    attr.length = parseInt(answers['attr-length']);
                }
                attr.type = answers['attr-type'];
                break;
            case 'file':
            case 'binary':
                attr.type = 'BLOB';
                break;
            default:
                throw new Error('Unrecognized data type');
        }

        return attr;
    }

    /**
     * Prompts for a model attribute.
     * @param {Object} self The generator context.
     * @param {Object} scope The scope object.
     * @param {Object} attrs Array for storing attributes.
     * @param {Function} cb Callback function.
     * @returns {undefined}
     */
    function promptModelAttr(self, scope, attrs, cb) {
        var appAnswers, chalk, prompts;

        appAnswers = self.config.get('answers'); // TODO depending on database, supply missing column types
        chalk = scope.global.logging.chalk;

        ++modelOrder;

        if (!attrs) {
            attrs = [];
        }

        if (attrs instanceof Function) {
            cb = attrs;
            attrs = [];
        }

        if (!cb) {
            cb = function () {}
        }

        prompts = [
            {
                name: 'attr-name',
                message: "Type in the name of your model's attribute " + chalk.cyan('#' + modelOrder) + '.',
                type: 'input',
                required: true,
                validate: function (input) {
                    var hasDupe;

                    hasDupe = attrs.reduce(function (curr, next) {
                        if (!input) {
                            input = '';
                        }

                        return curr || next.name.trim().toLowerCase() === input.trim().toLowerCase();
                    }, false);

                    return (hasDupe ? 'An attribute with the same name has already been specified.' : true);
                }
            },
            {
                name: 'attr-type-base',
                message: "Select your attribute's data type.",
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'Boolean',
                        value: 'boolean'
                    },
                    {
                        name: 'integer',
                        value: 'integer'
                    },
                    {
                        name: 'real (float)',
                        value: 'real'
                    },
                    {
                        name: 'string',
                        value: 'string'
                    },
                    {
                        name: 'date/time',
                        value: 'datetime'
                    },
                    {
                        name: 'file',
                        value: 'file'
                    }
                ]
            },
            {
                name: 'attr-type',
                message: 'How would you like to store this ' + chalk.cyan('file') + '?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'by its path',
                        value: 'VARCHAR'
                    },
                    {
                        name: 'by its raw binary contents',
                        value: 'BLOB'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'file');
                }
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('integer') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'INTEGER',
                        value: 'INTEGER'
                    },
                    //{
                    //    name: 'TINYINT',
                    //    value: 'TINYINT'
                    //},
                    //{
                    //    name: 'SMALLINT',
                    //    value: 'SMALLINT'
                    //},
                    //{
                    //    name: 'MEDIUMINT',
                    //    value: 'MEDIUMINT'
                    //},
                    {
                        name: 'BIGINT',
                        value: 'BIGINT'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'integer');
                }
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('real') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    //{
                    //    name: 'REAL',
                    //    value: 'REAL'
                    //},
                    {
                        name: 'FLOAT',
                        value: 'FLOAT'
                    },
                    {
                        name: 'DECIMAL',
                        value: 'DECIMAL'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'real');
                }
            },
            {
                name: 'attr-string-type',
                message: 'How do you intend for this ' + chalk.cyan('string') + ' to be inputted?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'In an <input>',
                        value: 'sentence',
                    },
                    {
                        name: 'In a <textarea>',
                        value: 'paragraph'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string');
                }
            },
            {
                name: 'attr-password-string',
                message: 'Is this ' + chalk.cyan('string') + ' a password?',
                type: 'confirm',
                required: true,
                'default': function (answers) {
                    return (answers['attr-name'].trim().toLowerCase().search(/\bpassword\b/gi) > -1);
                },
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' &&
                        answers['attr-string-type'] === 'sentence'
                    );
                }
            },
            {
                name: 'attr-type',
                message: 'Select the type for this ' + chalk.cyan('string') + '.',
                type: 'list',
                required: true,
                choices: [
                    // {
                    //     name: 'CHARACTER',
                    //     value: 'CHARACTER'
                    // },
                    {
                        name: 'VARCHAR',
                        value: 'VARCHAR'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' &&
                        answers['attr-string-type'] === 'sentence'
                    );
                }
            },
            {
                name: 'attr-type',
                message: 'Select the type for this ' + chalk.cyan('string') + '.',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'TEXT',
                        value: 'TEXT'
                    },
                    {
                        name: 'MEDIUMTEXT',
                        value: 'MEDIUMTEXT'
                    },
                    {
                        name: 'LONGTEXT',
                        value: 'LONGTEXT'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' &&
                        answers['attr-string-type'] === 'paragraph'
                    );
                }
            },
            {
                name: 'attr-length',
                message: 'Specify the length of the ' + chalk.cyan('string') + '.',
                type: 'input',
                required: true,
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' &&
                        answers['attr-string-type'] === 'sentence' &&
                        (answers['attr-type'] === 'VARCHAR' ||
                        answers['attr-type'] === 'CHARACTER')
                    );
                },
                validate: function (input) {
                    if (isNaN(input)) {
                        return 'Please enter an integer.'
                    }
                    return (parseInt(input) > 0 || 'Please enter an integer greater than zero.');
                },
                'default': 255
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('date/time') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'DATETIME',
                        value: 'DATETIME'
                    },
                    {
                        name: 'DATE',
                        value: 'DATE'
                    },
                    {
                        name: 'TIME',
                        value: 'TIME'
                    },
                    //{
                    //    name: 'YEAR',
                    //    value: 'YEAR'
                    //},
                    {
                        name: 'TIMESTAMP',
                        value: 'TIMESTAMP'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-type-base'] === 'datetime');
                }
            },
            {
                name: 'attr-nullable',
                message: 'Is this attribute nullable?',
                type: 'confirm',
                required: true
            },
            {
                name: 'attr-visible',
                message: 'Is this attribute visible from the REST API responses?',
                type: 'confirm',
                required: true,
                'default': true,
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' &&
                        answers['attr-string-type'] === 'sentence' &&
                        answers['attr-password-string']
                    );
                }
            },
            {
                name: 'continue',
                message: 'Do you want to add more attributes?',
                type: 'confirm',
                required: true
            }
        ]
            .map(scope.global.validation.required);

        self.prompt(prompts, function (answers) {
            attrs.push(makeAttr(answers));

            if (!answers.continue) {
                return cb(attrs);
            }

            promptModelAttr(self, scope, attrs, cb);
        });
    }

    /**
     * Function to check if a model exists.
     *
     * @param {Object} self The generator instance.
     * @param {String} name The model name to check.
     * @returns {Boolean} A value indicating if the named model exists.
     */
    function isModelNameExisting(self, name) {
        var models;

        models = self.config.get('models') || [];

        return models.reduce(function (curr, next) {
            return !!name && !!next && !!next.name &&
                (curr || next.name.toLowerCase().trim() === name.toLowerCase().trim());
        }, false);
    }

    module.exports = function prompting(self, scope) {
        var modelNameDuplicateArg = isModelNameExisting(self, self.arguments[0]);
        done = self.async();
        prompts = [
            {
                name: 'name',
                message: 'Type in your model name (please use a singular noun).',
                type: 'input',
                required: true,
                validate: function (input) {
                    if (isModelNameExisting(self, input.name)) {
                        return 'There is already a model of the same name.';
                    }
                },
                when: function () {
                    return (self.arguments.length < 1 || modelNameDuplicateArg);
                }
            }
        ]
            .concat(scope.local.options)
            .map(scope.global.validation.required);

        if (modelNameDuplicateArg) {
            self.log('There is already a model of the same name.');
        }

        self.prompt(prompts, function (answers) {
            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            promptModelAttr(self, scope, function (attrs) {
                var models;

                answers.attrs = attrs;
                models = self.config.get('models') || [];
                models.push(answers);
                self.config.set('models', models);

                done();
            });
        });
    };
})();
