(function () {
    var chalk, done, prompts;

    chalk = require('chalk');

    /**
     * Makes an attribute from an answers hash.
     * @param {Object} answers The answers hash.
     * @returns {Object} The attribute object.
     */
    function makeAttr(answers) {
        var attr;

        attr = {
            name: answers['attr-name'].trim(),
            nullable: answers['attr-nullable']
        };

        switch(answers['attr-type-base']) {
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
                    attr.length = answers['attr-length'];
                }
                attr.type = answers['attr-type'];
                break;
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
     * @param {Object} attrs Array for storing attributes.
     * @param {Function} cb Callback function.
     * @returns {undefined}
     */
    function promptModelAttr(self, attrs, cb) {
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

        self.prompt([
            {
                name: 'attr-name',
                message: "Type in your model's attribute name. " + chalk.red('(Required)'),
                type: 'input',
                required: true,
                validate: function (input) {
                    var hasDupe;

                    hasDupe = attrs.reduce(function (curr, next) {
                        return curr || next.name.trim().toLowerCase() === input.trim().toLowerCase();
                    }, false);

                    if (hasDupe) {
                        return 'An attribute with the same name has already been specified.';
                    }

                    return (input.trim().length > 0 || 'Please enter a valid attribute name.');
                }
            },
            {
                name: 'attr-type-base',
                message: "Select your model's data type.",
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
                        name: 'binary',
                        value: 'binary'
                    }
                ]
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
                    {
                        name: 'TINYINT',
                        value: 'TINYINT'
                    },
                    {
                        name: 'SMALLINT',
                        value: 'SMALLINT'
                    },
                    {
                        name: 'MEDIUMINT',
                        value: 'MEDIUMINT'
                    },
                    {
                        name: 'BIGINT',
                        value: 'BIGINT'
                    }
                ],
                when: function (answers) {
                    return answers['attr-type-base'] === 'integer';
                }
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('real') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'REAL',
                        value: 'REAL'
                    },
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
                    return answers['attr-type-base'] === 'real';
                }
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('string') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'CHARACTER',
                        value: 'CHARACTER'
                    },
                    {
                        name: 'VARCHAR',
                        value: 'VARCHAR'
                    },
                    {
                        name: 'TEXT',
                        value: 'TEXT'
                    }
                ],
                when: function (answers) {
                    return answers['attr-type-base'] === 'string';
                }
            },
            {
                name: 'attr-length',
                message: 'Specify the length of the ' + chalk.cyan('string') + '.',
                type: 'input',
                required: true,
                when: function (answers) {
                    return (answers['attr-type-base'] === 'string' && answers['attr-type'] !== 'text');
                }
            },
            {
                name: 'attr-type',
                message: 'What type of ' + chalk.cyan('date/time') + ' is this?',
                type: 'list',
                required: true,
                choices: [
                    {
                        name: 'DATETIME',
                        value: 'datetime'
                    },
                    {
                        name: 'DATE',
                        value: 'date'
                    },
                    {
                        name: 'TIME',
                        value: 'time'
                    }
                ],
                when: function (answers) {
                    return answers['attr-type-base'] === 'datetime';
                }
            },
            {
                name: 'attr-nullable',
                message: 'Is this attribute nullable?',
                type: 'confirm',
                required: true
            },
            {
                name: 'continue',
                message: 'Do you want to add more attributes?',
                type: 'confirm',
                required: true
            }
        ], function (answers) {
            attrs.push(makeAttr(answers));

            if (!answers.continue) {
                return cb(attrs);
            }

            promptModelAttr(self, attrs, cb);
        });
    }

    module.exports = function prompting(self) {
        done = self.async();

        prompts = [];

        if (self.arguments.length < 1) {
            prompts.push({
                name: 'name',
                message: 'Type in your model name. ' + chalk.red('(Required)'),
                type: 'input',
                required: true,
                validate: function (input) {
                    return (input.trim().length > 0 || 'Please enter your model name.');
                }
            });
        }

        prompts = prompts.concat(require('./../common/options'));

        self.prompt(prompts, function (answers) {
            if (self.arguments.length > 0) {
                answers.name = self.arguments.shift();
            }

            promptModelAttr(self, function (attrs) {
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
