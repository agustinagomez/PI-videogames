const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.FLOAT
    },
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {timestamps: false});
};

// [ ] Videojuego con las siguientes propiedades:
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *
// [ ] Genero con las siguientes propiedades:
// ID
// Nombre
