(function () {
    module.exports = function (answers) {
        return function DELETE(req, res, next) {
            res.json({ status: 'ok' });
        };
    };
})();
