(function () {
    var express, router;

    express = require('express');
    router = express.Router();

    /*
    <% routes.forEach(function (route) { %>
    router.<%= route.method.toLowerCase() %>('<%= route.url %>', function (req, res) {
        res.render('<%= route.view %>', <%= JSON.stringify(route.options) %>);
    });
    <% }) %>
    */

    module.exports = router;
})();
