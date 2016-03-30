(function () {
    var requireDir, subtasks;

    requireDir = require('require-dir');
    subtasks = requireDir('./writing');

    module.exports = function writing(self, scope) {
        Object.keys(subtasks).forEach(function (subtaskName) {
            subtasks[subtaskName](self, scope);
        });
    };
})();
