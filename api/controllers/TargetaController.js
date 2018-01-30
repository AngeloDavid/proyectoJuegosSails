/**
 * TargetaController
 *
 * @description :: Server-side logic for managing targetas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	buscarIdCard: function (req, res) {
        var idCard =req.params.id;

        console.log('idCard',idCard);
        var myQuery = Targeta.findOne({ description: { 'like': '' + idCard }, estado: true }).exec(function (err,results){
            console.log(err)
            console.log(myQuery);
            if(err || results == undefined){
                return res.json({
                        error: false,
                        objeto:[],
                        cliente:[]
                    }) ;
            }else{
                var user=Cliente.findOne({'id': results.userFk}).exec(function (err2,results2) {                    
                    if(err2){
                    error =  false;    
                    }else{
                        error = true;
                    }
                    return res.json({
                        error: error,
                        objeto:results,
                        cliente:results2
                    }) ;    
                });
            }
            
            
            
            });
    }
    

};

