/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
      }
  }
};

