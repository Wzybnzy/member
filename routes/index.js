var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
var dbBase = 'school';
var dbColl = 'user';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


//添加

router.post('/api/add', function(req, res, next) {
    var params = req.body;
    var name = params.name,
        age = params.age,
        phone = params.phone,
        address = params.address,
        card = params.card;

    if (!name || !age || !card) {
        res.send({ code: 2, message: "请完善信息" });
    } else {
        getIsHas();
    }

    function getIsHas() { //判断该用户是否已经存在
        mongodb.find(dbBase, dbColl, { card: card }, function(result) { //[{}]
            if (result.length > 0) {
                res.send({ code: 3, message: "该用户已经存在" });
            } else {
                addUser();
            }
        });

    }

    function addUser() { //添加用户
        mongodb.insert(dbBase, dbColl, params, function(result) {
            if (result) {
                res.send({ code: 0, message: "添加成功" });
            } else {
                res.send({ code: 1, message: "添加失败" });
            }
        });
    }

});
module.exports = router;