(function () {
    var pluralize, table;

    pluralize = require('pluralize');

    /**
     * Configure the current database file for SQLite.
     *
     * @param {Object} model The model to store in database.
     * @param {String} currentDb The path to the current database file.
     * @param {Function} cb The callback function.
     * @returns {undefined}
     */
    function configureSqlite(model, currentDb, cb) {
        var db, knex, modelName;

        knex = require('knex');
        db = knex({
            client: 'sqlite3',
            connection: {
                filename: currentDb
            },
            useNullAsDefault: true,
            debug: true
        });
        modelName = pluralize(model.name).toLowerCase().replace(/\s+/g, '_');
        db.schema.createTable(modelName, function (tableInst) {
            table = tableInst;
            
            table.increments();

            model.attrs.forEach(function (attr) {
                configureSqlColumn(attr);
            });
        })
            .then(function () {
                db.destroy();
                return cb(null);
            });
    }
    
    function configureSqlColumn(attr) {
        var column;
        
        switch (attr.typeBase) {
            case 'boolean':
                column = table.boolean(attr.name);
                break;
            case 'integer':
                switch (attr.type) {
                    case 'BIGINT':
                        column = table.bigInteger(attr.name);
                        break;
                    case 'INTEGER':
                        column = table.integer(attr.name);
                        break;
                    default:
                        column = table.specificType(attr.name, attr.type);
                        break;
                }
                break;
            case 'string':
                switch (attr.type) {
                    case 'TEXT':
                        column = table.text(attr.name);
                        break;
                    case 'MEDIUMTEXT':
                        column = table.text(attr.name, 'mediumtext');
                        break;
                    case 'LONGTEXT':
                        column = table.text(attr.name, 'longtext');
                        break;
                    case 'VARCHAR':
                        column = table.string(attr.name, attr.length);
                        break;
                    default:
                        column = table.specificType(attr.name, attr.type);
                        break;
                }
                break;
            case 'float':
                switch (attr.type) {
                    case 'DECIMAL':
                        column = table.decimal(attr.name);
                        break;
                    case 'FLOAT':
                        column = table.float(attr.name);
                        break;
                    default:
                        column = table.specificType(attr.name, attr.type);
                        break;
                }
                break;
            case 'date':
                switch (attr.type) {
                    case 'DATE':
                        column = table.date(attr.name);
                        break;
                    case 'TIME':
                        column = table.time(attr.name);
                        break;
                    case 'DATETIME':
                        column = table.dateTime(attr.name);
                        break;
                    case 'TIMESTAMP':
                        column = table.timestamp(attr.name);
                        break;
                    default:
                        column = table.specificType(attr.name, attr.type);
                        break;
                }
                break;
            case 'file':
                switch (attr.type) {
                    case 'VARCHAR':
                        column = table.text(attr.name, 255);
                        break;
                    case 'BLOB':
                        column = table.binary(attr.name);
                        break;
                }
                break;
        }
        if (attr.characteristics.nullable) {
            column = column.notNullable();
        }
        
        return column;
    }

    /**
     * Configure the current database file for MySQL.
     *
     * @param {String} schema The schema of the database.
     * @param {Object} model The model to store in database.
     * @param {String} currentDb The path to the current database file.
     * @param {Function} cb The callback function.
     * @returns {undefined}
     */
    function configureMySql(schema, model, currentDb, cb) {
        var db, knex, modelName;

        knex = require('knex');
        db = knex({
            client: 'mysql',
            connection: require(currentDb)
        });
        modelName = model.name.toLowerCase().replace(/\s+/g, '_');
        db.schema.createTable(modelName, function (tableInst) {
            table = tableInst;
            
            table.increments();

            model.attrs.forEach(function (attr) {
                configureSqlColumn(attr);
            });
        })
            .then(function () {
                db.destroy();
                return cb(null);
            });
    }

    module.exports = function configureDatabase(self, scope) {
        var answers, currentDb, currentModel, done, models, schema;

        answers = self.config.get('answers');
        currentDb = self.config.get('currentDb');
        models = self.config.get('models');
        currentModel = models.slice(-1)[0];
        schema = self.appname.replace(/\s+/g, '_');
        done = self.async();
        self.log('   configure ' + currentDb);
        switch (answers.db.id) {
            case 'sqlite':
                configureSqlite(currentModel, currentDb, done);
                break;
            case 'mysql':
                configureMySql(schema, currentModel, currentDb, done);
                break;
        }
    };
})();
