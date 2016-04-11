(function () {
    module.exports = [
        {
            name: 'relation-type',
            message: 'What kind of relation is this?',
            type: 'list',
            required: true,
            choices: [
                {
                    name: 'one-to-many',
                    value: '1..n'
                },
                {
                    name: 'many-to-many',
                    value: 'n..n'
                }
            ]
        }
    ];
})();
