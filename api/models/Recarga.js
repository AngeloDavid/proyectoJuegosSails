/**
 * Recarga.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

connection:'PJMysqlServer',
  attributes: {
    abono:{
      type:'float',
      columnName:'abo_reca',
      required:true
    },
    total:{
      type:'float',
      columnName:'tot_reca'
    },
    saldo:{
      type:'float',
      columnName:'sal_reca'
    },    
    credito:{
      type:'float',
      columnName:'credito_reca'
    },
    observaciones: {
      type:'text',
      columnName:'obse_reca'

    },

    //Referencia de tarjeta
	  tarjetaFk:{
          model:'targeta'
	  },
    
    //Referencia de promocion
	  promocionFk:{
          model:'promocion'
	  }
  


  }
};

