/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	auth: function (req, res) {
    	console.log('Autentificacion');
    	var id =req.params.id;
    	var claves = id.split("Œ");
    	var email = claves[0];
    	var password = claves[1]; 

    	var myQuery = User.findOne();
        myQuery.where({'email':email,'password':password});

        myQuery.exec(function callBack(err,results){
        	if(err || results == undefined){
                return res.json({
                        error: err,
                        resp:false,
                        user:[]
                     
                    }) ;
            }else{
            
                return res.json({
                    error: err,
                    resp:true,
                    user:results
                }) ;    
          
            }
            
        });

    
    }

};

