import Enrollment from "../models/EnrollmentModel.js";
import { Op } from "sequelize";
import User from "../models/UserModel.js";
import Plan from "../models/PlanModel.js";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv()

const SECRET = process.env.SECRET_MATRICULA

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
        console.log(dataInicio.toISOString(), "AQUIIIIIIIIIIIIIII")
        console.log(dataInicio.toTimeString())
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


        const token = jwt.sign({id_user: id_user}, SECRET, {expiresIn: `${plan.duracao * 30}d`})
    
        // CADASTRANDO MATRICULA
        const matriculaCreate = await Enrollment.create({
            id_user: id_user, 
            id_plan: id_plan, 
            data_inicio: dataInicio, 
            data_fim: dataFim
        })
        return res.status(200).json({msg: "Matricula cadastrada.", matriculaCreate, token})

    } catch (error) {
        console.log("Erro na rota de criar matricula => ", error)
        return res.status(500).json({msg: "Erro na rota de criar matricula => ", error})
    }
}

// patch
export async function cancelarMatricula(req,res){
    const {id} = req.params

    const matricula = await Enrollment.findByPk(id) 
    if(!matricula){
        return res.status(400).json({msg: "Matricula não encontrada!"})
    }

    matricula.status = "Suspensa"
    await matricula.save() 

    return res.status(200).json({msg: "Matricula cancelada", matricula})
}

export async function excluirMatricula(req,res){
    const {id} = req.params
    const matricula = await Enrollment.findByPk(id) 
    if(!matricula){
        return res.status(400).json({msg: "Matricula não encontrada!"})
    }
   
    await Enrollment.destroy({where: {id: id}})

    return res.status(200).json({msg: "Matricula excluída"})
}


