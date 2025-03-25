import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";
import Workout from "./WorkoutModel.js"; 
import Exercise from "./ExerciseModel.js";

const WorkoutExercise = sequelize.define("WorkoutExercise", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_workout: { type: DataTypes.INTEGER, allowNull: false },
    id_exercise: { type: DataTypes.INTEGER, allowNull: false },
    series: { type: DataTypes.INTEGER, allowNull: false },
    repeticoes: { type: DataTypes.INTEGER, allowNull: false },
    carga: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  });
  
  // Relacionamento N:N
  Workout.belongsToMany(Exercise, { through: WorkoutExercise, foreignKey: "id_workout" });
  Exercise.belongsToMany(Workout, { through: WorkoutExercise, foreignKey: "id_exercise" });
  
export default WorkoutExercise