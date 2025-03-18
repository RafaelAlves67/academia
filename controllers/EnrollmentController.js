import Enrollment from "../models/EnrollmentModel.js";
import { Op } from "sequelize";
import User from "../models/UserModel.js";
import Plan from "../models/PlanModel.js";

export async function createMatricula(req,res) {
    try {
        const {id_user, id_plan} = req.body 
    
        if(!id_user || !id_plan) {
            return res.status(400).json({msg: "Preencha os campos necessários"})
        }

        const user = await User.findOne({where: {id: id_user}})
        const plan = await Plan.findOne({where: {id: id_plan}})
        if(!user || !plan){
            return res.status(400).json({msg: "Usuário e/ou Plano não encontrados"})
        }
    
        // CONVERTENDO VALORES PARA DATA 
        const dataInicio = new Date() 
        const dataFim = new Date()

        // VERIFICAR O TEMPO DE MATRICULA
        dataFim.setMonth(dataFim.getMonth() + plan.duracao) 

        
        if(dataFim < dataInicio){
            return res.status(400).json({msg: "Insira uma data de termino válida"})
        }
    
        // VERIFICAR SE EXISTE MATRICULA 
        const matricula = await Enrollment.findOne({
            where: {
                id_user: id_user, 
                status: "Ativa"
            }
        })
        if(matricula){
            return res.status(400).json({msg: "Já existe uma mátricula ativa para esse usuário"})
        }
    
        // CADASTRANDO MATRICULA
        const matriculaCreate = await Enrollment.create({
            id_user: id_user, 
            id_plan: id_plan, 
            data_inicio: dataInicio, 
            data_fim: dataFim
        })
        return res.status(200).json({msg: "Matricula cadastrada.", matriculaCreate})

    } catch (error) {
        console.log("Erro na rota de criar matricula => ", error)
        return res.status(500).json({msg: "Erro na rota de criar matricula => ", error})
    }
}