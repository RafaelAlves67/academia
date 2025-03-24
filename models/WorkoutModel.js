import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import User from "./UserModel.js";

// treinos (ficha)
const Workout = sequelize.define("Workout", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_aluno: { type: DataTypes.INTEGER, allowNull: false },
    id_instrutor: { type: DataTypes.INTEGER, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: false },
    dias_da_semana: { type: DataTypes.STRING, allowNull: false },
  });
  
  // Relacionamentos
  User.hasMany(Workout, { foreignKey: "id_aluno", as: "treinosAluno" });
  Workout.belongsTo(User, { foreignKey: "id_user", as: "aluno" });
  
  User.hasMany(Workout, { foreignKey: "id_instrutor", as: "treinosInstrutor" });
  Workout.belongsTo(User, { foreignKey: "id_user", as: "instrutor" });

  export default Workout