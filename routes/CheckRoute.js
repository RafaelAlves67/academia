import { Router } from "express";
import { registrarCheckIn } from "../controllers/CheckInController.js";

const checkRoute = Router()

checkRoute.post('/autenticate/:id_user', registrarCheckIn)

export default checkRoute