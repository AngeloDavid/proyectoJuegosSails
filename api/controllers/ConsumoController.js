/**
 * ConsumoController
 *
 * @description :: Server-side logic for managing consumoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	ConsultarSaldo : function (req,res) {

                

        var parametros = req.allParams();
        
        var idTarjeta = parametros.idTargeta;
        var idMaquin = parametros.idMaquin;
        //idTarjeta = idTarjeta.slice(1, (idTarjeta.length - 1));
        var hoyFecha = new Date();
        var days = ["DOMINGO","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO"];
        var dia = days[hoyFecha.getDay()];
        
        var querySql = "SELECT targeta.id, descp_targ, sal_targ AS 'Saldo', cred_targ as 'Credito',tipo_targ as 'Tipo',islimitado_targ as 'islimitado',fv_targ as 'fecha_vencimiento', fa_targ as 'fecha_Activacion', CONCAT( nom_cli,' ',ape_cli) as 'Cliente' FROM targeta ";
        querySql += "LEFT JOIN cliente on (cliente.id = targeta.userFk) ";
        querySql += "WHERE estado_targ = 1 and targeta.descp_targ = '"+ idTarjeta+"'";
        // console.log(querySql);
                
        var tarQuery = Targeta.query(querySql,
            function (err, targetaRes) {
                if (err) {
                    console.log(err);
                    return res.json({
                        error: true, 
                        msg: 'Vuelva a ingresar la tarjeta -ECSW01'  
                    });
                } else if (targetaRes.length == 1) {                   
                    
                    targetaRes = targetaRes[0];
                    var vencimiento = isValidDate(targetaRes.fecha_vencimiento,"YYYY-mm-dd");
                    var activacion = isValidDate(targetaRes.fecha_Activacion,"YYYY-mm-dd");
                    if (!targetaRes.islimitado) {
                        //cuando es de regalo, o ilimitado
                        if (hoyFecha <= vencimiento && hoyFecha >= activacion) {
                            return res.json({
                                error: false,
                            });
                        } else {
                            return res.json({
                                error: true,
                                msg:'Tarjeta fuera del rango de fecha permitido'
                            });
                        }
                    } else {
                        console.log(hoyFecha + ">=" + activacion)
                        if (hoyFecha >= activacion) {
                            console.log(dia)
                            Maquina.findOne({ 'estado': true, id: idMaquin }).exec(function callBack(err, maquina) {
                                if (err) {
                                    
                                    return res.json({
                                        error: true,
                                        msg: 'Vuelva a ingresar la tarjeta -ECSW02'  
                                    });
                                } else if (maquina) {
                                    var querySqlprom = "SELECT promocion.id, cant_pro, oper_pro, fv_pro, fa_pro, dia_hor, final_hor, ini_hor FROM promocion ";
                                    querySqlprom += "LEFT JOIN horario ON(horario.id = promocion.horarioFk) ";
                                    querySqlprom += "WHERE promocion.estado_pro = 1  and apli_pro = 'consumo' and dia_hor = '"+dia+"'";                                   
                                    
                                    var tarifa = maquina.tarifa;
                                    var tipo = maquina.tipo; 
                                    var error =false;
                                    var msg = 'Transacción Correcta';                                    
                                    if (tipo == 'credito') {
                                        if (0 < (targetaRes.Credito - tarifa) ){
                                            targetaRes.Credito -= tarifa;
                                        }else{
                                            msg = "Su Tarjeta no dispone del suficiente CREDITO para esta máquina";
                                        }                                        
                                    }else{
                                        if (0 < (targetaRes.Saldo - tarifa)) {                                            
                                            targetaRes.Saldo -= tarifa;
                                        } else{
                                            msg = "Su Tarjeta no dispone del suficiente SALDO para esta máquina";
                                        }                                        
                                    }
                                    
                                    
                                    
                                    return res.json({
                                        error: error,
                                        msg: msg,
                                        idTarjeta: idTarjeta,
                                        idMaquin: idMaquin,
                                        Cliente: targetaRes.Cliente,
                                        saldo: targetaRes.Saldo,
                                        credito: targetaRes.Credito,
                                    });

                                    /* Promocion.query(querySqlprom,function (err,promocion) {
                                        var error;
                                        var msg ='';
                                        if(err){                                            
                                            error =true;
                                            msg = 'Vuelva a ingresar la tarjeta -ECSW04';
                                        }else if(promocion.length ==1){
                                            var vencimiento = promocion[0].fv_pro != null ? isValidDate(promocion[0].fv_pro,"YYYY-mm-dd"): 1;
                                            var activacion = promocion[0].fa_pro != null ? isValidDate(promocion[0].fa_pro,"YYYY-mm-dd"): new Date();
                                            var horaInicio = promocion[0].ini_hor != null ? isValidDate(promocion[0].ini_hor, 'h:m') : null;
                                            var horaFinal = promocion[0].final_hor != null ? isValidDate(promocion[0].final_hor, 'h:m') : null;


                                            if (vencimiento != 1 )
                                                if(hoyFecha >= activacion &&  hoyFecha<=vencimiento ){                                                   
                                                    if(hoyFecha>=horaInicio && hoyFecha <= horaFinal){                                                   
                                                        if(tipo =='credito'){
                                                            targetaRes.Credito = operacion(promocion[0].oper_pro, promocion[0].cant_pro, targetaRes.Credito) 
                                                        }else{
                                                            targetaRes.Saldo = operacion(promocion[0].oper_pro, promocion[0].cant_pro, targetaRes.Saldo) 
                                                        }

                                                        
                                                    }
                                                }
                                            else if (hoyFecha >= activacion ){

                                                }
                                                                            
                                        }else{
                                            error=true;
                                            msg="Sin promociones ese dia";                                            
                                        }

                                        return res.json({
                                            error: error,
                                            msg: msg,
                                            idTarjeta: idTarjeta,
                                            idMaquin: idMaquin,
                                            Cliente: targetaRes.Cliente,
                                            saldo: targetaRes.Saldo,
                                            credito: targetaRes.Credito,
                                        });
                                        
                                    }) */
                                    
                                    
                                } else {
                                    return res.json({
                                        error: true,
                                        msg: 'Vuelva a ingresar la tarjeta -ECSW03'  
                                    });
                                }
                            })
                        }else{
                            return res.json({
                                error: true,
                                msg: 'Tarjeta no activada'
                            });
                        }
                    }                
                } else {
                    return res.json({
                        error: true,
                        msg: 'Vuelva a ingresar la tarjeta -ECSW02'  
                    });
                }
            });
        // tarQuery.where({'id':idTarjeta,'estado':true});


        console.log(req.allParams());

        function isValidDate (dateString,format) {
            if (dateString == null){
                console.log(dateString);
                return '';
            }else{                
                switch (format) {
                    case "YYYY-mm-dd":
                        var regEx = /^\d{4}-\d{2}-\d{2}$/;
                        if (!dateString.match(regEx)) return null;  // Invalid format
                        var d = new Date(dateString);
                        if (!d.getTime() && d.getTime() !== 0) return null; // Invalid date
                        return d.toISOString().slice(0, 10) === dateString;
                        break;
                    case "h:m":
                        var now = new Date();
                        now.setHours(dStr.substr(0, dStr.indexOf(":")));
                        now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                        now.setSeconds(0);
                        return now;
                        break;
                    default:
                        return 'Formato invalido'
                        break;
                }            
            }
            
        }
        function operacion(oper_pro, cant_pro,saldo) {
            switch (oper_pro) {
                case '=':
                    return cant_pro;
                    break;
                case '*':                    
                    return saldo * cant_pro;
                    break;
                case '/':
                    return saldo / cant_pro;
                    break;
                case '+':
                    return saldo + cant_pro;
                    break;
                case '-':
                    return saldo - cant_pro;
                    break;
                default:
                    return null;
                    break;
            }
        }
    },
    

    
};

