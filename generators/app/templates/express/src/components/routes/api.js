(function () {
    var express, router;

    express = require('express');
    router = express.Router();

    router.get('/', function (req, res) {
        res.json({ title: 'Express' });
    });

    module.exports = router;
})();
