const log = require('../custom_modules/user-transac');

var express = require('express');
var router = express.Router();

//3if authenticated
router.post('/', (req, res) => {
    log.login(req.body, (err, result) => {
        console.log(result);
        res.json({ result: result });
    });
});

module.exports = router;
