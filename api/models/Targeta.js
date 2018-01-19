/**
 * Targeta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

connection:'PJMysqlServer',
  attributes: {
        description:{
          type:'string',
          required:true,
          columnName:'descp_targ',
          
        },
        saldo:{
          type:'float',
          required: true,
          columnName:'sal_targ',
           defaultsTo: '5.0'
        },
        creditos:{
          type:'float',
          required: true,
          columnName:'cred_targ',
           defaultsTo: '5.0'
        },
        fecha_vencimiento:{
          type:'string',
          columnName:'fv_targ',          
        },
        fecha_Activacion:{
          type:'string',
          columnName:'fa_targ'
        },
        fecha_UltimoMovimiento:{
          type:'string',
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

