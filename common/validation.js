(function () {
    var logging;
    logging = require('./logging');
    module.exports = {
        required: function (prompt) {
            var validateFn;
            validateFn = prompt.validate || function () {
                return true;
            };
            if (prompt.required && prompt.type === 'input') {
                prompt.message += ' ' + logging.chalk.red('(Required)');

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
