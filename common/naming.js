(function () {
    var pluralize, slug;

    pluralize = require('pluralize');
    slug = require('slug');

    module.exports = {
        tableName: function (name) {
            return slug(pluralize(name.replace(/\s+/g, ' '), '_'));
        },
        url: function (name) {
            return slug(name.replace(/\s+/g, ' '));
        },
        urlPlural: function (name) {
            return slug(pluralize(name.replace(/\s+/g, ' ')));
        },
        packageName: function (name) {
            return slug(name.replace(/\s+/g, ' '));
        },
        packageTitle: function (name) {
            return name.replace(/\s+/g, ' ');
        }
    };
})();
