(function () {
    module.exports = {
        Columns: function Attrs(attrs) {
            return attrs
                .map(function (attr) {
                    return "'" + attr.name.replace("'", "\\\'") + "'";
                })
                .join(', ');
        },
        Tables: function Tables(tables) {
            if (!(tables instanceof Array)) {
                tables = [tables];
            }
            return tables
                .map(function (table) {
                    return "'" + table.getName().replace("'", "\\\'") + "'";
                })
                .join(', ');
        }
    }
})();
