var express = require ("express");
var router = express();
router.use("/",function(req,res){
    res.json({"message":"this is product page"})
    
});
module.exports = router;

