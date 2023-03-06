var express = require ("express");
var server = express();
var controller = require(__dirname + "/app/controllers");
app.use(controller);
var server = app.listen(2999, function(){
    console.log("server is rungning!");
})
