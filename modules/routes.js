var express = require('express')
var projects = require('./projects')
var node_app = require('./node-app')

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
router.use("/node-app", node_app);

router.use(function(req, res, next){
    var data = {
        titleHeader: siteName,
        title:  "error"
    }

    res.status(200).render('error', data);
});

module.exports = router
