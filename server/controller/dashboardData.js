var mysql = require('mysql');
var bcrypt = require("bcrypt");
var fs = require('fs');
var connection = require('./connection');
var Crypter = require("cryptr");
cryptr = new Crypter('its encription key');
const jwt = require("jsonwebtoken");
var sleep = require("system-sleep");


module.exports.getProduct = function (req, res) {
      var sql = "SELECT * FROM products WHERE company = ? && category = ?";
      connection.query(sql, [req.body.company, req.body.category], function (err, result) {
      if (err) {
      res.status(200).json({
        status: false,
        message: 'Some error with query'
      })
    }
    else {
      res.status(200).json({
        status: true,
        res: result
      });
    }
  })
}

module.exports.getAllProduct = function (req, res) {
  var sql = "SELECT * FROM products WHERE company = ?";
    connection.query(sql, [req.body.company], function (err, result) {
    if (err) {
    res.status(200).json({
      status: false,
      message: 'Some error with query'
    })
  }
  else {
    res.status(200).json({
      status: true,
      res: result
    });
  }
})
}

module.exports.addProduct = function (req, res) {
  const url = req.protocol + '://' + req.get("host");
  const imageUrl = url + "/images/" + req.file.filename;
  try {
    var sql = "INSERT INTO products (name,brandName,company,category,ingredients,formulation,spectrum,pest,imgUrl) VALUES ?";
    var values = [
      [req.body.name,req.body.brand_name,req.body.company,req.body.category,req.body.ingeridents,req.body.formulation,req.body.spectrum,req.body.pest,imageUrl],
    ];
    connection.query(sql, [values], function (err, result) {
      if (err){
        res.json({
          status: false,
          message: "Query have some error"
      });
      }else{
        res.json({
          status: true,
          message: "Project inserted successfully"
      });
      }
    });
  } catch (err) {
    res.status(200).json({
      status: false,
      message: 'Some thing wend wrong in query'
    });
  }
}


module.exports.deleteProduct = function (req, res) {
  try {
    fs.unlink(__dirname+'/images/'+req.body.imgUrl, function (err) {
      if (err || !err){
        connection.query('DELETE FROM products WHERE product_id = ' + mysql.escape(req.body.id), function (error, results) {
          if (error) {
            res.status(200).json({
              status: false,
              message: 'there are some error with query'
            })
          }
          else {
            res.status(200).json({
              status: true,
              message: "Product deleted successfully"
            });
          }
        })
      }
  });   
    
  } catch (err) {
    res.status(200).json({
      status: false,
      message: 'Some thing went wrong!'
    })
  }
}

module.exports.getTeam = function (req, res) {
  var sql = "SELECT * FROM team";
    connection.query(sql, function (err, result) {
    if (err) {
    res.status(200).json({
      status: false,
      message: 'Some error with query'
    })
  }
  else {
    res.status(200).json({
      status: true,
      res: result
    });
  }
})
}