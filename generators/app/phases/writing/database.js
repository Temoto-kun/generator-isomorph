(function () {
    var date;

    date = require('moment')(new Date()).format('YYYY-MM-DD');

    /**
     * Determines the database path for file-based database systems.
     * @param self The generator context.
     * @param answers The answers hash.
     * @returns {String}
     */
    function determineDatabasePath(self, answers) {
        switch(answers.db.id) {
            case 'sqlite':
                return self.destinationPath('database/' + date + '/db.sqlite');
            case 'nosql':
                return self.destinationPath('database/' + date + '/db.nosql');
        }
    }

    /**
     * Checks if the database is file-based.
     * @param answers The answers hash.
     * @returns {boolean}
     */
    function isDatabaseFileBased(answers) {
        var fileBasedDb = ['sqlite', 'nosql'];

        return fileBasedDb.indexOf(answers.db.id) !== -1;
    }

    module.exports = function (self) {
        var answers, dbPath;

        answers = self.config.get('answers');

        if (isDatabaseFileBased(answers)) {
            dbPath = determineDatabasePath(self, answers);

            self.fs.write(dbPath, '');
            answers.currentDatabase = dbPath;
            self.config.set('answers', answers);
        }
    };
})();
