var mysql = require('mysql');
var bcrypt = require("bcrypt");
var Crypter = require("cryptr");
var connection = require('./connection');
cryptr = new Crypter('its encription key');
const jwt = require("jsonwebtoken");
var sleep = require("system-sleep");

module.exports.signup = function (req,res) {
  
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      connection.query("insert into accounts (email,password) VALUES ('"+req.body.email+"','"+hash+"') ") ,function(error,results){
        if (error){
        res.json({
            status:false,
            message:'Your account can not be create due to some invalid data'
          })
        }
        else{
          res.json({
            status:true,
            message: 'Your account has been created succussfully',
          });

        }
      }
    });
}

//signing in query
module.exports.signin = function (req,res) {
try{
  var sql = "SELECT * FROM accounts WHERE email = ?"
  connection.query(sql, [req.body.email], function (err, result) {
      if (err){
         res.json("No User Exist");
      }
      else{
        bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
          if (err) {
            throw err
          } else if (!isMatch) {
          } 
          else {
            const token = jwt.sign({email: result[0].email, userId: result[0].pk_account},
              "secret_this_should_be_longer", 
            { expiresIn: "1h"});
            res.status(200).json({
              token: token,
              status: true,
              expiresIn: 36000,
              userId: result[0].pk_account,
              email: result[0].email,
            });
          }
        })
      }
    });

}catch(err){
}
}

module.exports.changePassword = function (req,res) {
  try{
    connection.query('SELECT pk_account,Password FROM accounts WHERE Pk_account='+ mysql.escape(req.body.userId),function(error,results){
        if (error){
          return res.status(401).json({
            status:false,
            message:'Account not exist'
          });
        }
        else{
          bcrypt.compare(req.body.currentPassowrd, results[0].Password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
            } else {
              
              bcrypt.hash(req.body.newPassword, 10)
              .then(hash => {
                  connection.query("UPDATE accounts SET password="+mysql.escape(hash)+" WHERE pk_account = "+mysql.escape(req.body.userId)) ,function(error,results){
                  if (error){
                  res.json({
                      status:false,
                      message:'Your account can not be create due to some invalid data'
                    })
                  }
                  else{
                    res.json({
                      status:true,
                      message: 'Your account has been created succussfully',
                    });
                  }
                }
              });

            }
          })
        }          
      });
  
  }catch(err){
  }
  
  }