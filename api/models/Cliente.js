/**
 * Cliente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'PJMysqlServer',
  attributes: {
      cedula :{
        type:'string',  
        unique:true,
        size:16,
        columnName:'ced_cli',
        required: true
      },
      nombre :{
        type:'string',
        columnName:'nom_cli',
        required: true
      },
      apellido :{
        type:'string',
        columnName:'ape_cli',
        required: true
      },   
      fecha_nacimiento :{
        type:'string',
        columnName:'fecNac_cli',
        required: false
      },
      telefono :{
        type:'string',
        columnName:'tel_cli',
        required: true
      },
      email :{
        type:'email',
        columnName:'email_cli',
        required: true
      },
      direccion :{
        type:'text',
        columnName:'tel_cli'
      },
      FanPageId:{
        type:'integer',
        columnName:'fgid'
      },
      estado:{
        type:'boolean',
        columnName:'estado_cli',
        defaultsTo: true
      },

      //Referencia con la tarjeta

      tarjetas:{
        collection:'targeta',
        via:'userFk'
      }
  }
};

