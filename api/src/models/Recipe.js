const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{ // este es mi id
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // pongo en false para que sea obligatorio poner algo
      primaryKey: true, 
    },
    title: { // este es mi nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{ // este es el "resumen del plato"
      type: DataTypes.STRING,
      allowNull: false
    },
    steps:{ // este es el "paso a paso"
      type: DataTypes.TEXT,
      allowNull: true,
    },
    score:{ // este es la "puntuacion"
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore:{ // este es el "nivel de comida saludable"
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  });
};
