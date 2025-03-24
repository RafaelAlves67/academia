import express from 'express'
import { deletarExercicio, editarExercicio, filtrarPorGrupoMuscular, listarExercicio, pesquisarExercicioNome, registrarExercicio } from '../controllers/ExerciseController.js'

const ExercicioRoute = express.Router() 

ExercicioRoute.post('/cadastrar', registrarExercicio)
ExercicioRoute.patch('/editar', editarExercicio)
ExercicioRoute.delete('/deletar', deletarExercicio)
ExercicioRoute.get('/listarAll', listarExercicio)
ExercicioRoute.get('/search/:nome', pesquisarExercicioNome)
ExercicioRoute.get('/searchGrupo/:grupo_muscular', filtrarPorGrupoMuscular)


export default ExercicioRoute