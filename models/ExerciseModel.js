import { DataTypes } from "sequelize";
import sequelize from "../data/db.js"; 

const Exercise = sequelize.define("Exercise", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    grupo_muscular: { type: DataTypes.STRING, allowNull: false },
  }); 
 
  
export default Exercise