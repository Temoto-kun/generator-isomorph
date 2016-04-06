(function () {
    var Logging;
    Logging = require('./Logging');
    module.exports = {
        Required: function (prompt) {
            var validateFn;
            validateFn = prompt.validate || function () {
                return true;
            };
            if (prompt.required && prompt.type === 'input') {
                prompt.message += ' ' + Logging.Chalk.red('(Required)');

                prompt.validate = function requiredValidate(input) {
                    var result;
                    input = input.toString();
                    result = (input.trim().length <= 0 ?
                        'This field is required.' : validateFn(input)
                    );
                    return result;
                }
            }
            return prompt;
        }
    };
})();
