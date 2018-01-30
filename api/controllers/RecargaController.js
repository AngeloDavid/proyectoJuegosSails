/**
 * RecargaController
 *
 * @description :: Server-side logic for managing recargas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	BuscarFecha: function (req,res) {
        Recarga.find({'createdAt':{'>':new WebKitDirectoryReader}})
    }
};

