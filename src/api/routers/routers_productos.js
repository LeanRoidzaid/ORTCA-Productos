const express = require("express");
const app = express();
const productos = require('../controllers/controllers_productos');
const  verificaRol  = require("../middlewares/verificaRolMiddleware");
const  verificaToken  = require("../middlewares/verificaTokenMiddleware");


/**
 * @swagger
 * /api/productos/all:
 *   get:
 *     tags:
 *       - listar usuarios
 *     description: Busca en Mysql a todos los productos disponibles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/all", function(req, res) {
    
});

/**
 * @swagger
 * /api/productos/producto:
 *   get:
 *     tags:
 *       - Buscar un usuario
 *     description: Busca en Mysql un producto en particular
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: devuelve json con la busqueda
 *       400:
 *         description: devuelve json avisando del error
 *
 */

app.get("/producto", function(req, res) {
    
});


/**
 * @swagger
 * /api/productos/alta:
 *   post:
 *     tags:
 *       - Alta producto
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             codbar:
 *               type: string
 *             nombre:
 *               type: string
 *             nSerie:
 *               type: string
 *             codOrigen:
 *               type: string
 *             cantDisp:
 *               type: integer 
 *         required:
 *           - codbar
 *           - GTIN
 *           - nSerie
 *           - codOrigen
 *           - cantDisp
 *     responses:
 *       200:
 *         description: Producto insertado en tabla Mysql con exito
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el producto en Mysql
 */

app.post('/alta', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,
    function (req, res) {
    let result = productos.insertarProducto(req.body)
    result.then(produc => {
        
        //console.log(produc);
        
        const movimiento = { idProducto: req.body.codbar, 
                             tipoMov: "Ingreso",
                             cantUnidades: req.body.cantDisp,
                             idUsuario: req.tokenDesencriptado.datostoken.username.id}

        let movi = productos.insertarMovimiento(movimiento)
        if (movi != null){
            //console.log(movimiento);
            res.status(200).send("Ingresaron " + req.body.cantDisp + " unidades de " + req.body.nombre);
        }else {
            console.log(err);
            res.status(400).send('Error en el insert de movimiento' + err.message);
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send('Error en el insert de producto' + err.message);
        
    })
    
})

/**
 * @swagger
 * /api/productos/movimiento:
 *   post:
 *     tags:
 *       - Registra movimiento de producto
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         schema:
 *           properties:
 *             codbar:
 *               type: string
 *             cantidad:
 *               type: integer 
 *         required:
 *           - codbar
 *           - cantidad
 *     responses:
 *       200:
 *         description: Se agrega un moviento y se actualiza la contidad disponible
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta accion
 *       400:
 *         description: No se puede realizar este  para el producto
 */


app.post('/movimiento', verificaToken.verificaTokenMiddleware, verificaRol.esAdministradorMiddleware,
function (req, res) {
    let result = productos.movimientoProducto(req)
    result.then(movi => {
        console.log(movi);
        res.send(movi)
         
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error al realizar un ingreso de producto' + err.message);
    })
})


/**
 * @swagger
 * /api/productos/actualizar:
 *   post:
 *     tags:
 *       - Actualizar productos
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             codbar:
 *               type: string
 *             nombre:
 *               type: string
 *             nSerie:
 *               type: string
 *             codOrigen:
 *               type: string
 *             cantDisp:
 *               type: integer 
 *         required:
 *           - codbar
 *           - GTIN
 *           - nSerie
 *           - codOrigen
 *           - cantDisp 
 *     responses:
 *       200:
 *         description: producto insertado en tabla Mysql con exito
 *       401:
 *         description: Token invalido, no tiene permisos para ejecutar esta api
 *       400:
 *         description: Ocurrio un error al guardar el producto en Mysql
 */

app.post('/actualizar', function (req, res) {

});


module.exports = app;

