(function () {
    function configureSqlite(model, currentDb) {
        var db, knex, modelName;

        knex = require('knex');
        //db = new sqlite.Database(currentDb);
        //modelName = model.name.toLowerCase().replace(/\s+/i, '_');
        //cmd = knex().createTable(modelName, function (table) {
        //    table.increments();
        //    model.attrs.forEach(function (attr) {
        //    });
        //});
        db = knex({
            client: 'sqlite3',
            connection: {
                filename: currentDb
            }
        });

        modelName = model.name.toLowerCase().replace(/\s+/g, '_');
        db.createTable(modelName, function (table) {
            table.increments();

            model.attrs.forEach(function (attr) {
                switch (attr.typeBase) {
                    case 'boolean':
                        table.boolean(attr.name);
                        break;
                    case 'integer':
                        switch (attr.type) {
                            case 'BIGINT':
                                table.bigInteger(attr.name);
                                break;
                            default:
                                table.integer(attr.name);
                                break;
                        }
                        break;
                    case 'string':
                        switch (attr.type) {
                            case 'TEXT':
                                table.text(attr.name);
                                break;
                            case 'MEDIUMTEXT':
                                table.text(attr.name, 'mediumtext');
                                break;
                            case 'LONGTEXT':
                                table.text(attr.name, 'longtext');
                                break;
                            case 'VARCHAR':
                            case 'CHARACTER':
                                table.string(attr.name, attr.length);
                                break;
                        }
                        break;
                    case 'float':
                        switch (attr.type) {
                            case 'DECIMAL':
                                table.decimal(attr.name);
                                break;
                            default:
                                table.float(attr.name);
                                break;
                        }
                        break;
                    case 'date':
                        switch (attr.type) {
                            case 'DATE':
                                table.date(attr.name);
                                break;
                            case 'TIME':
                                table.time(attr.name);
                                break;
                            case 'DATETIME':
                                table.dateTime(attr.name);
                                break;
                            case 'TIMESTAMP':
                                table.timestamp(attr.name);
                                break;
                        }
                        break;
                    case 'binary':
                        table.binary(attr.name);
                        break;
                }
            });
        });

        //db.serialize(function () {
        //    db.query();
        //});
    }

    module.exports = function (self) {
        var answers, currentDb, currentModel, models;

        answers = self.config.get('answers');
        currentDb = self.config.get('currentDb');
        models = self.config.get('models');
        currentModel = models.slice(-1)[0];
        switch (answers.db.id) {
            case 'sqlite':
                configureSqlite(currentModel, currentDb);
        }
    };
})();
