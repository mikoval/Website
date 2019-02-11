var fork = require('child_process').fork;
var express = require('express')
const fs = require('fs');
var router = express.Router()
const siteName = "Projects";

function loadDefaultPicture(type){
    if(type == "directory"){
        return "https://s3.amazonaws.com/mikerkoval/website/core-images/clipart684867.png"
    } else {
        return "http://marlborofishandgame.com/images/6/6c/Question-mark.png"
    }
}
function getDirectoryContents(path){
    var obj = fs.lstatSync(path);
    if(!obj.isDirectory()){
        return null;
    }

    if(path[path.length-1] != "/") {
        path+="/";
    }
    path += "config.info";
    var contents = fs.readFileSync(path,  'utf8');
    contents = JSON.parse(contents);
    if(!contents.picture) {
        contents.picture = loadDefaultPicture(contents.type);
    }
    return contents;
}

function splitPath(path){
    var arr = path.split("/");
    var totalPath = "";
    var retArray = []
    for(var i = 0; i < arr.length-1; i++){
        totalPath += "/" + arr[i];
        retArray.push(totalPath);
    }
    return retArray;
}

function getProjects(path) {
    var projects = [];
    var files = fs.readdirSync(path);
    for(var i = 0; i < files.length; i++){
        filePath = path + files[i];
        var fileData = getDirectoryContents(filePath);
        if(fileData) {
            projects.push(fileData);
        }
    }
    return {path: path, projects : projects};
}

router.use(function(req, res, next){
    var path = req.path;
    if(path[path.length-1] != "/") {
        path+="/";
    }
    path = "projects" + path;
    var pathContents = getDirectoryContents(path);
    var pathType = pathContents.type;
    console.log(pathType);
    if(pathType == "directory"){
        var projects = getProjects(path);
        res.render('projects', projects);
    } else if(pathType == "node-app") {
        console.log("DIRECTING TO " + pathContents.url);
        //res.writeHead(302, { 'Location': pathContents.url });

        res.status(301).redirect(pathContents.url);

        res.end();
    } else {
        var data = {
            titleHeader: siteName,
            title:  "error"
        }
        res.status(404).render('error', data);
    }
});

module.exports = router
