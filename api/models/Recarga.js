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
      require:true
    },
    total:{
      type:'float',
      columnName:'tot_reca'
    },
    saldo:{
      type:'float',
      columnName:'sal_reca'
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

