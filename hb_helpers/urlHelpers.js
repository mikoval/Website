const Handlebars = require('handlebars');
var helpers = {};

helpers.buildLink =  function(url, text) {
   return new Handlebars.SafeString("<a href='"+url+"'>"+text+"</a>"); 
};

helpers.linkablePath =  function(value) {
    console.log(value);
    var arr = value.split("/");
    var totalPath = "";
    var html = "";
    for(var i = 0; i < arr.length; i++) {
        if(!arr[i]) {
            break;
        }
        totalPath += "/" + arr[i];
        html += "{{buildLink '" + totalPath + "' '" + arr[i] + "'}} / ";
    }
    var template = Handlebars.compile(html);


    return template();;
};

for (var key in helpers) {
    if (helpers.hasOwnProperty(key)) {
        Handlebars.registerHelper(key, helpers[key]); 
    }
}

module.exports = helpers;
