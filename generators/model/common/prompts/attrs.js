(function () {
    module.exports = function (attrs, scope) {
        var chalk;
        
        chalk = scope.global.Logging.Chalk;
        
        return [
            {
                name: 'attr-name',
                message: "Type in the name of your model's attribute " + chalk.cyan('#' + scope.instance.modelOrder) + '.',
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
                    {// *may not be supported in sqlite
                       name: 'TINYINT',
                       value: 'TINYINT'
                    },
                    {// *may not be supported in sqlite
                       name: 'SMALLINT',
                       value: 'SMALLINT'
                    },
                    {// *may not be supported in sqlite
                       name: 'MEDIUMINT',
                       value: 'MEDIUMINT'
                    },
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
                    {
                        name: 'CHARACTER',
                        value: 'CHARACTER'
                    },
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
                    { // *may not be supported in sqlite
                       name: 'YEAR',
                       value: 'YEAR'
                    },
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
                name: 'attr-characteristics',
                message: 'Select the characteristics of this attribute.',
                type: 'checkbox',
                required: true,
                choices: [
                    {
                        name: 'nullable',
                        value: 'nullable'
                    },
                    {
                        name: 'hidden from REST API responses',
                        value: 'hidden'
                    }
                ],
                when: function (answers) {
                    return !(answers['attr-password-string']);
                }
            },
            {
                name: 'attr-characteristics',
                message: 'Select the characteristics of this attribute.',
                type: 'checkbox',
                required: true,
                choices: [
                    {
                        name: 'nullable',
                        value: 'nullable'
                    }
                ],
                when: function (answers) {
                    return (answers['attr-password-string']);
                }
            },
            {
                name: 'continue',
                message: 'Do you want to add more attributes?',
                type: 'confirm',
                required: true
            }
        ]
            .map(scope.global.Validation.Required);
    }
})();
