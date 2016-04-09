(function () {
    var done, modelOrder, prompts;
    modelOrder = 0;
    
    function makeCharacteristics(rawCharacteristics) {
        var allCharacteristics, characteristics;
        
        allCharacteristics = ['nullable', 'hidden'];
        characteristics = {};
        
        allCharacteristics.forEach(function (c) {
            characteristics[c] = rawCharacteristics.indexOf(c) > -1;
        });
        
        return characteristics;
    }

    /**
     * Makes an attribute from an answers hash.
     * @param {Object} answers The answers hash.
     * @returns {Object} The attribute object.
     */
    function makeAttr(answers) {
        var attr;

        attr = {
            name: answers['attr-name'].trim(),
            characteristics: answers['attr-characteristics'],
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
        
        if (answers['attr-password-string'] && attr.characteristics.indexOf('hidden') < 0) {
            attr.characteristics.push('hidden');
        }
        
        attr.characteristics = makeCharacteristics(attr.characteristics);

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
        var appAnswers, chalk, prompts, childScope;

        appAnswers = self.config.get('answers'); // TODO depending on database, supply missing column types
        chalk = scope.global.Logging.Chalk;
        attrs = attrs || [];
        if (attrs instanceof Function) {
            cb = attrs;
            attrs = [];
        }
        cb = cb || function () {};
        childScope = scope;
        childScope.instance = {
            modelOrder: ++modelOrder
        };
        prompts = scope.local.prompts.attrs(attrs, childScope);
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
            .concat(scope.local.prompts['default'])
            .map(scope.global.Validation.Required);

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
