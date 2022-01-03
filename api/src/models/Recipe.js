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
      type: DataTypes.STRING, // // es un string con maximo de 255 caracteres
      allowNull: false, // en false para que sea obligatorio 
    },
    summary:{ // este es el "resumen del plato"
      type: DataTypes.STRING, 
      allowNull: false
    },
    steps:{ // este es el "paso a paso"
      type: DataTypes.TEXT,// puede poner todos los caracteres que quiere
      allowNull: true,  // pongo en true  para que no sea obligatorio poner algo
    },
    score:{ // este es la "puntuacion"
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore:{ // este es el "nivel de comida saludable";
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING(1234), // es un string con maximo de 1234 caracteres        
      allowNull: true
    },
    createdInDb:{ // con esto accede mas facil a la receta que cree en la base de tados(data base)
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  });
};
