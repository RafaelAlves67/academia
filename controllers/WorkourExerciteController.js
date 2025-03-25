import Exercise from "../models/ExerciseModel.js";
import WorkoutExercise from "../models/WorkourExerciteModel.js";
import Workout from "../models/WorkoutModel.js";

export async function cadastrarExercicio_Ficha(req,res){
    try {
        const {id_workout, id_exercise, series, repeticoes, carga} = req.body 

        if(!id_workout || id_exercise || !series || repeticoes){
            return res.status(400).json({msg: "Preencha todos campos necessários para cadastro."})
        }   

        // verificar se existe a ficha
        const ficha = await Workout.findOne({where: {id: id_workout}})
        if(!ficha){
            return res.status(400).json({msg: "Ficha não encontrada!"})
        }
        // verificar se existe exercicio
        const exercicio = await Exercise.findOne({where: {id: id_exercise}})
        if(!exercicio){
            return res.status(400).json({msg: "Exercicio não encontrado!"})
        }

        const fichaExercicio = await WorkoutExercise.create({
            id_workout: id_workout,
            id_exercise: id_exercise,
            series: series,
            repeticoes: repeticoes,
            carga: carga
        })

        return res.status(200).json({msg: "Exercico inserido da ficha", fichaExercicio})
    } catch (error) {
        console.log("Erro na rota de cadastrar exercicios na ficha => ", error)
        return res.status(500).json({msg: "Erro na rota de cadastrar exercicios na ficha => ", error})
    }
}