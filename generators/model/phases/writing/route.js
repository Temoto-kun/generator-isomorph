(function () {
    var requireDir, subtasks;

    requireDir = require('require-dir');
    subtasks = requireDir('./route');

    module.exports = function writeRoutes(self) {
        Object.keys(subtasks).forEach(function (subtaskName) {
            subtasks[subtaskName](self);
        });
    };
})();
