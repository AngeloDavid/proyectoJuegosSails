/**
 * Targeta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

connection:'PJMysqlServer',
  attributes: {
        saldo:{
          type:'float',
          required: true,
           defaultsTo: '5.0'
        },
        fecha_vencimiento:{
          type:'datetime',
          columnName:'fv_targ',
          required: true
        },
        fecha_Activacion:{
          type:'datetime',
          columnName:'fa_targ'
        },
        fecha_UltimoMovimiento:{
          type:'datetime',
          columnName:'fum_targ'
        },
        tipo:{
          type:'string',
          columnName:'tipo_targ',
          enum: ['regalo', 'normal', 'VIP']
        },
        islimitado:{
          type:'boolean',
          columnName:'islimitado_targ'
        },
        estado:{
          type:'boolean',
          columnName:'estado_targ',
           defaultsTo: true
        },
        //Referencia de cliente
        userFk:{
          model:'cliente'
        },


      //Referencia con la consumo
      consumos:{
        collection:'consumo',
        via:'tarjetaFk'
      },
      //Referencia con la consumo
      recargas:{
        collection:'recarga',
        via:'tarjetaFk'
      }
  }
};

