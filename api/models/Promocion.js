/**
 * Promocion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

connection:'PJMysqlServer',
  attributes: {
       titulo:{
        type:'string',
        columnName:'tit_pro',
        required:true        
      },
      decripcion:{
        type:'text',
        columnName:'tit_pro'
      },
      cantidad:{
        type:'float',
        columnName:'cant_pro',
        required:true
      },
      operacion:{
        type:'string',
        columnName:'oper_pro',
        required:true
      },
      aplica_a:{
        type:'string',
        columnName:'apli_pro',
        enum: ['recarga', 'consumo',]
      },
      fecha_vencimiento:{
          type:'string',
          columnName:'fv_pro',          
        },
      fecha_Activacion:{
          type:'string',
          columnName:'fa_pro'
        },
      islimitado:{
          type:'boolean',
          columnName:'islimitado_pro'
        },
        estado:{
          type:'boolean',
          columnName:'estado_pro',
          defaultsTo: true
        },


     //Referencia con la consumo
      consumos:{
        collection:'consumo',
        via:'promocionFk'
      },
      //Referencia con la consumo
      recargas:{
        collection:'recarga',
        via:'promocionFk'
      },

      //Referencia de horario
      horarioFk:{
            model:'horario'
      },
  }
};

