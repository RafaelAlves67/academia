import { Router } from "express";
import { createPlano } from "../controllers/PlanController.js";

const planRoute = Router() 

planRoute.post('/create', createPlano)


export default planRoute