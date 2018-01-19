/**
 * Maquina.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = { 
  connection:'PJMysqlServer',
  attributes: {
      description:{
        type:'text',
        columnName:'desc_maq',
        required:true
      },
      tarifa:{
        type:'float',
        columnName:'tari_maq',
        required:true
      },
      intentos:{
        type:'integer',
        columnName:'int_maq'
      },
      tipo:{
        type:'string',
        columnName:'type_maq',
        required:true,
        enum: ['credito', 'saldo']
      },
      estado:{
        type:'boolean',
        columnName:'est_maq',
        defaultsTo: true
      },

      //Referencia con la consumo
      consumos:{
        collection:'consumo',
        via:'maquinaFk'
      }



  }
};

