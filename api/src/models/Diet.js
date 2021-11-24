const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    // id:{ // este es mi id
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false, // pongo en false para que sea obligatorio poner algo
    //   primaryKey: true, 
    // },
    name: { // este es mi nombre
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};