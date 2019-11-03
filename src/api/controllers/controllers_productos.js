const PRODUCTOS = require('../models/models_productos');
const MOVIMIENTOS = require('../models/models_movimientos');

exports.insertarProducto = function(producto){
    return PRODUCTOS.create({
        id: producto.id,
        codbar: producto.codbar, 
        GTIN: producto.GTIN,
        nSerie: producto.nSerie,
        codOrigen: producto.codOrigen,
        canDisp: producto.canDisp
       })
}

exports.insertarMovimiento = function(movimiento){
    return MOVIMIENTOS.create({
        idProducto: movimiento.idProducto, 
        tipoMov: movimiento.tipoMov,
        cantUnidades: movimiento.cantUnidades,
        idUsuario: movimiento.idUsuario,
       })
}

exports.movimientoProducto = async function(req){

    let producto = await this.buscarProducto(req.body.codbar);
    producto.cantDisp = producto.cantDisp + req.body.cantidad;
    
    result = await this.updateDisponible(producto)
 
    if (req.body.cantidad < 0){
        tipo = "egreso"
    }else{
        tipo = "ingreso"
    }


    const movimiento = { idProducto: req.body.codbar, 
                         tipoMov: tipo,
                         cantUnidades: req.body.cantidad,
                         idUsuario: req.tokenDesencriptado.datostoken.username.id}

    return this.insertarMovimiento(movimiento)

}

exports.updateDisponible = async function(producto){
    
    return PRODUCTOS.update({
        cantDisp: producto.cantDisp},
        {where: {codbar:producto.codbar}}
        )
}

exports.buscarProducto = async function(codbar){
    return PRODUCTOS.findOne({
        where: {codbar: codbar}}

    )
}