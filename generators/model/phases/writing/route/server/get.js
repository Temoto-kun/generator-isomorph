(function () {
    module.exports = function (answers) {
        return function GET(req, res, next) {
            res.json({ status: 'ok' });
        };
    };
})();
