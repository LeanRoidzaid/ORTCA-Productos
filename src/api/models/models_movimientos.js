const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const Movimimentos = sequelize.define('movimientos', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    idProducto: Sequelize.INTEGER, 
    tipoMov: Sequelize.STRING,
    cantUnidades: Sequelize.INTEGER,
    idUsuario: Sequelize.INTEGER,
    },{timestamps: false
 });
module.exports = Movimimentos; 