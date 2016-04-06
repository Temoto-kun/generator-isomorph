(function () {
    var pluralize, slug;

    pluralize = require('pluralize');
    slug = require('slug');

    module.exports = {
        Table: function (name) {
            return slug(pluralize(name.replace(/\s+/g, ' '), '_'));
        },
        Url: function (name) {
            return slug(name.replace(/\s+/g, ' '));
        },
        UrlPlural: function (name) {
            return slug(pluralize(name.replace(/\s+/g, ' ')));
        },
        PackageName: function (name) {
            return slug(name.replace(/\s+/g, ' '));
        },
        PackageTitle: function (name) {
            return name.replace(/\s+/g, ' ');
        }
    };
})();
