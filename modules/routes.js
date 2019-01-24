var express = require('express')
var projects = require('./projects')
var router = express.Router()
const siteName = "Mike's website";

router.get('/', (req, res) => {
    var data = {
        titleHeader: siteName,
        title: req.path
    }
  res.render('index', data);
});

router.use("/projects", projects);

router.use(function(req, res, next){
    var data = {
        titleHeader: siteName,
        title:  "error"
    }

    res.status(404).render('error', data);
});

module.exports = router
