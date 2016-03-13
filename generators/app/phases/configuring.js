(function () {
    var requireDir, subtasks;

    requireDir = require('require-dir');
    subtasks = requireDir('./configuring');

    module.exports = function configuring(self) {
        Object.keys(subtasks).forEach(function (subtaskName) {
            subtasks[subtaskName](self);
        });
    };
})();
