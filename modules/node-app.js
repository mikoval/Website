var express = require('express')
var router = express.Router()
var portLookup = require('./portLookup');

router.use(function(req, res, next){
    var path = req.path;
    if(path[0] == "/"){
        path = path.substr(1);
    }
    
    console.log(path);
    var port = portLookup.getPort(path);
    var url = "http://142.93.27.217"
    res.writeHead(302, {
        Location: url + ":" + port
    });
    res.end();

});

module.exports = router
