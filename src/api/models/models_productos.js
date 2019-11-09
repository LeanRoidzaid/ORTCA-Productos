const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const Productos = sequelize.define('productos', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     codbar: Sequelize.STRING, 
     nombre: Sequelize.STRING,
     nSerie: Sequelize.STRING,
     codOrigen: Sequelize.STRING,
     cantDisp: Sequelize.INTEGER,
     },{timestamps: false
  }); 
module.exports = Productos; 
