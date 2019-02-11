var fs = require('fs');

var portsFile = "ports_directory.info";
 

var portLookup = {};

var ports = {};

portLookup.getPort = function(path) {
    return ports[path];
}

function init() {
    var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(portsFile)
    });

    lineReader.on('line', function (line) {
        var arr = line.split(" ");
        console.log("Path: " + arr[0] + ", port: " + arr[1]);
        ports[arr[0]] = arr[1];
    });
}

init();
module.exports = portLookup;
