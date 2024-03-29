/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 // We don't want to store password with out encryption
var bcrypt = require('bcrypt');


module.exports = {
  connection:'PJMysqlServer',
  attributes: {

  	fullName :{
        type:'string',
        columnName:'fullname_user',
        required: true
      },
  	 email :{
        type:'email',
        columnName:'email_user',
        required: true        
      },
      password :{
        type:'string',  
        size:16,
        columnName:'password_user',
        required: true
      },
      // We don't wan't to send back encrypted password either
      toJSON: function () {
        var obj = this.toObject();
        delete obj.encryptedPassword;
        return obj;
      }  
  }

  ,
  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },

 comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
  
};

