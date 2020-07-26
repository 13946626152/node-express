var express = require('express');
var router = express.Router();
var fetch=require('node-fetch')
var mongoClient = require('mongodb').MongoClient;
// 2.定义url

var url = 'mongodb://127.0.0.1:27017';
// 3.连接数据的名称

var dbName = 'xdl';
// 4.连接数据库


// 数据库控制

router.post('/api/control/login', function(req, res, next) {

      mongoClient.connect(url,function (err,client) {
          if (err) throw err;
          console.log('连接成功');
          // 连接到具体的数据库
          var db = client.db(dbName);
          // // 获取集合
          var collection = db.collection('users');
         
          collection.find().toArray(function (err,doc) {
            doc=JSON.stringify(doc)
            console.log(doc)
            if(req.body.params.login==true){
              
              res.send(doc)
              
            }else{
              res.render('data/err', { title: 'Express' });
            }
            client.close();
          })
          
          
        
      });

  
  
  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('data/index', { title: 'Express' });
});


router.get('/api/data1', function(req, res, next) {
  if(req.query.type==1){
    res.render('data/data1', { title: 'Express' });
  }else{
    res.render('data/data2', { title: 'Express' });
  }
});

router.get('/api/data2', function(req, res, next) {
  if(req.query.type==1){
    res.render('data/data1', { title: 'Express' });
  }else{
    res.render('data/data2', { title: 'Express' });
  }
  
});

router.post('/api/list', function(req, res, next) {
  
  console.log(req.body.params)
  if(req.body.params.type==3){
    res.render('data/list', { title: 'Express' });
  }
  
});
router.post('/api/about', function(req, res, next) {

  console.log(req.body.params)
  if(req.body.params.type==4){
    res.render('data/about', { title: 'Express' });
  }
  
});





module.exports = router;
