(function () {
    var date;

    date = require('moment')(new Date()).format('YYYY-MM-DD');

    /**
     * Determines the database path for file-based database systems.
     *
     * @param {Object} self The generator context.
     * @param {Object} answers The answers hash.
     * @returns {String} The database path.
     */
    function determineDatabasePath(self, answers) {
        switch (answers.db.id) {
            case 'sqlite':
                return self.destinationPath('database/' + date + '/db.sqlite');
            case 'nosql':
                return self.destinationPath('database/' + date + '/db.nosql');
        }
    }

    /**
     * Checks if the database is file-based.
     *
     * @param {Object} answers The answers hash.
     * @returns {boolean} Value indicating if database is file-based.
     */
    function isDatabaseFileBased(answers) {
        var fileBasedDb = ['sqlite', 'nosql'];

        return fileBasedDb.indexOf(answers.db.id) !== -1;
    }

    module.exports = function writeDatabase(self, scope) {
        var answers, creds, dbPath;

        answers = self.config.get('answers');

        if (isDatabaseFileBased(answers)) {
            dbPath = determineDatabasePath(self, answers);
            self.fs.write(dbPath, '');
            self.config.set('currentDb', dbPath);
            self.config.set('answers', answers);
        }

        if (answers.db.id === 'mysql') {
            creds = {
                host     : 'localhost',
                user     : 'root',
                password : 'password',
                database : self.appname.replace(/\s+/g, '_')
            };
            self.config.set('currentDb', self.destinationPath('mysql.json'));
            self.fs.writeJSON(self.destinationPath('mysql.json'), creds);
        }
    };
})();
