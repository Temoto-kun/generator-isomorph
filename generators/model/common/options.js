(function () {
    module.exports = [
        {
            name: 'pagination',
            desc: 'Indicates if the model requires pagination, which is expected of large datasets.',
            message: 'Would you like to add pagination for this model?',
            type: 'confirm',
            'default': false
        }
    ];
})();
