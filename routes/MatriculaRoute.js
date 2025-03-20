import { Router } from "express";
import { cancelarMatricula, createMatricula, excluirMatricula } from "../controllers/EnrollmentController.js";

const matriculaRoute = Router() 

matriculaRoute.post('/create', createMatricula)
matriculaRoute.patch('/cancelar/:id', cancelarMatricula)
matriculaRoute.delete('/deletar/:id', excluirMatricula)


export default matriculaRoute