import { Router } from "express";
import { createMatricula } from "../controllers/EnrollmentController.js";

const matriculaRoute = Router() 

matriculaRoute.post('/create', createMatricula)

export default matriculaRoute