import { DataTypes } from "sequelize"; 
import sequelize from "../data/db.js";
import User from "./UserModel.js";


// matricula
const CheckIn = sequelize.define("CheckIn", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false },
    hora_entrada: { type: DataTypes.TIME, allowNull: false },
    hora_saida: { type: DataTypes.TIME, allowNull: true },
})

// RELACIONAMENTO
// Definição dos relacionamentos
User.hasMany(CheckIn, { foreignKey: "id_user" }); // Um usuário pode ter várias presenças
CheckIn.belongsTo(User, { foreignKey: "id_user" }); // Cada presença pertence a um usuário

export default CheckIn
