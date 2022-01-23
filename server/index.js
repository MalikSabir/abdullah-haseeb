
// its controlar class
const path = require('path');
const multer = require("multer");
const debug = require('debug')('node-angular');
var express = require('express');
var app =express();
var bodyparser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
var accountData = require('./controller/accountsData');
var dashboardData = require('./controller/dashboardData');
const checkAuth = require("./controller/middleware/check-auth");
require('dotenv').config();

///////////////////// Upload image multer function implements here //////////////
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };
  const storage = multer.diskStorage({
  destination: (req, file, cb) => {       //cb is call back
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if(isValid){
      error = null;
    }
    cb(error, "controller/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
  });

const Port = process.env.PORT;
var conn=app.listen(Port,function(){
  console.log('my listning port is', Port);
});
app.use("/images", express.static(path.join("controller/images")));
app.post('/api/signin',accountData.signin);
app.post('/api/signup',accountData.signup);
// app.post('/api/changePassword',checkAuth,accountData.changePassword);
app.post('/api/getAllProduct',dashboardData.getAllProduct);
app.post('/api/getProduct',dashboardData.getProduct);
app.post('/api/addProduct',checkAuth,multer({storage: storage}).single("image"), dashboardData.addProduct);
app.post('/api/deleteProduct',dashboardData.deleteProduct);
app.get('/api/getTeam',dashboardData.getTeam);


module.exports=app;
