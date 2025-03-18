import { DataTypes } from "sequelize"; 
import sequelize from "../data/db.js";
import User from "./UserModel.js";
import Plan from "./PlanModel.js";

// matricula
const Enrollment = sequelize.define("Enrollment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    id_plan: { type: DataTypes.INTEGER, allowNull: false },
    data_inicio: { type: DataTypes.DATE, allowNull: false },
    data_fim: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM("Ativa", "Inativa", "Suspensa"), allowNull: false, defaultValue: "Ativa" },
})

// Definição dos relacionamentos
User.hasMany(Enrollment, { foreignKey: "id_user" }); // Um usuário pode ter várias matrículas
Enrollment.belongsTo(User, { foreignKey: "id_user" }); // Cada matrícula pertence a um usuário

Plan.hasMany(Enrollment, { foreignKey: "id_plan" }); // Um plano pode ter várias matrículas
Enrollment.belongsTo(Plan, { foreignKey: "id_plan" }); // Cada matrícula pertence a um plano

export default Enrollment