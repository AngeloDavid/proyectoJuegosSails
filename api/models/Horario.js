/**
 * Horario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
connection:'PJMysqlServer',
  attributes: {
      dia:{
        type:'string',
        columnName:'dia_hor',
        require:true

      },
      hora_inicio:{
        type:'datetime',
        columnName:'ini_hor',
      },
      hora_final:{
        type:'datetime',
        columnName:'final_hor',
      },
      estado:{
          type:'boolean',
          columnName:'estado_pro',
          defaultsTo: true
        },
      //Referencia con la consumo
      promociones:{
        collection:'promocion',
        via:'horarioFk'
      }
  }
};

