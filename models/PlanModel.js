import { DataTypes } from "sequelize"; 
import sequelize from "../data/db.js";

// plano
const Plan = sequelize.define("Plan", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duracao: { type: DataTypes.INTEGER, allowNull: false },
})

export default Plan 