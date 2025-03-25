import { Router } from "express";
import { cadastrarFicha } from "../controllers/WorkoutController.js";
import {verifyUser} from '../helpers/verifyTipoUser.js'

const WorkoutRoute = Router()

WorkoutRoute.post('/cadastrar', verifyUser, cadastrarFicha)



export default WorkoutRoute