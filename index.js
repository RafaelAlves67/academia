import express from 'express'
import cors from 'cors' 
import sequelize from './data/db.js'
import User from './models/UserModel.js'
import Plan from './models/PlanModel.js'
import Enrollment from './models/EnrollmentModel.js'
import Workout from './models/WorkoutModel.js'
import Exercise from './models/ExerciseModel.js'
import WorkoutExercise from './models/WorkourExerciteModel.js'
// ROTAS
import userRoute from './routes/userRoutes.js'
import planRoute from './routes/PlanRoute.js'
import matriculaRoute from './routes/MatriculaRoute.js'
import checkRoute from './routes/CheckRoute.js'
import ExercicioRoute from './routes/ExercicioRoute.js'


const app = express() 

// middleware
app.use(express.json()) 
app.use(cors()) 

// rotas
app.use('/user', userRoute)
app.use('/plano', planRoute)
app.use('/matricula', matriculaRoute)
app.use('/check', checkRoute)
app.use('/exercicio', ExercicioRoute)


app.listen(3000,() => {
    console.log("Servidor rodando 3000")
})

sequelize.sync().then(() => {console.log("Banco de dados conectado")}).catch((e) => {
    console.log("Erro ao conectar ao banco = > " + e)
})