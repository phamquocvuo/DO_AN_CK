var express = require ("express");
const { listen } = require("./app/controllers");
var server = express();
var controller = require(__dirname + "/app/controllers");
app.use(controller);
var server = app.listen(2999, function(){
    console.log("server is rungning!");
})
app.set("views",__dirname + "/app/views");
app.set("view engine", "/ejs");
app.set("public",express.static(__dirname + "/public"));
