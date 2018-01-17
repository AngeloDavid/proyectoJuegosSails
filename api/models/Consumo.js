/**
 * Consumo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'PJMysqlServer',
  attributes: {
    abono:{
      type:'float',
      columnName:'fec_cons',
      require:true
    },
    total:{
      type:'float',
      columnName:'dia_cons'
    },

    //Referencia de tarjeta
	  tarjetaFk:{
          model:'targeta'
	  },
    //Referencia de maquina
	  maquinaFk:{
          model:'maquina'
	  },

    //Referencia de promocion
	  promocionFk:{
          model:'promocion'
	  },
  }
};

