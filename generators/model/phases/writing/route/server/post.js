(function () {
    module.exports = function (answers) {
        return function POST(req, res, next) {
            res.json({ status: 'ok' });
        };
    };
})();
