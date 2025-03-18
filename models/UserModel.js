import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

// usuario
const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: {type: DataTypes.STRING, allowNull: false},
    tipo: { type: DataTypes.ENUM("Aluno", "Instrutor", "Admin"), allowNull: false },
})

export default User 