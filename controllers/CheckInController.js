import User from "../models/UserModel.js";
import Enrollment from "../models/EnrollmentModel.js";
import CheckIn from "../models/CheckInModel.js";
import { Op } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()
import jwt from 'jsonwebtoken'
const SECRET  = process.env.SECRET_MATRICULA

export async function registrarCheckIn(req,res){
    try {
        const id_user = req.params.id_user 
        if(!id_user){
            return res.status(400).json({msg: "Informe o usuario!"})
        }     
        
        const user = await User.findOne({where: {id: id_user}})
        if(!user){
            return res.status(400).json({msg: "Usuário nã encontrado"})
        }  
        
        // PEGANDO A DATA ATUAL e HORA
        const dataAtual = new Date()


        // DATA FORMATADA
        const diaAtual = dataAtual.getDate()
        const mesAtual = dataAtual.getMonth() + 1
        const anoAtual = dataAtual.getFullYear()
        const data = `${anoAtual}-${mesAtual}-${diaAtual}`
        // HORARIO FORMATADO
        const horaAtual = dataAtual.getHours()
        const minutoAtual = dataAtual.getMinutes()
        const segundoAtual = dataAtual.getSeconds()
        const horario = `${horaAtual}:${minutoAtual}:${segundoAtual}`

        // VERIFICAR HORARIO DE FUNCIONAMENTO
        const horarioAbertura = new Date();
        horarioAbertura.setHours(6, 0, 0); // 06:00:00

        const horarioFechamento = new Date();
        horarioFechamento.setHours(22, 0, 0); // 22:00:00

        if (dataAtual < horarioAbertura || dataAtual > horarioFechamento) {
            return res.status(400).json({ msg: "Academia fechada!" });
        }

        // TOKEN
        const authToken = req.headers['authorization']
        const token = authToken && authToken.split(' ')[1]
        if (!token) {
            return res.status(400).json({ msg: "Acesso negado." })
        }

        try {
            const decoded = jwt.verify(token, SECRET)
            if(decoded.id_user !== parseInt(id_user)){
                return res.status(400).json({ msg: "Acesso negado ao usuário." })
            }
        } catch (error) {
            return res.status(403).json({ msg: "Token inválido. => ", error })
        }

        // VERIFICAR SE USUARIO JA ENTROU NESSE DIA 
        const vericaEntrada = await CheckIn.findOne({
            where: {
                id_user: id_user,
                data: data
            }
        })

        if(vericaEntrada){
            return res.status(400).json({msg: "Usuário ja inseriu check-in hoje!"})
        }


        const matricula = await Enrollment.findOne({
            where: {
                id_user: id_user,
                status: "Ativa"
            }
        });

        if(!matricula){
            return res.status(400).json({msg: "Matricula suspensa ou inativa"})
        }

        const checkin = await CheckIn.create({
            id_user: id_user,
            data: data,
            hora_entrada: horario 
        })

        return res.status(200).json({msg: "Check-in feito!", checkin})
        
    } catch (error) {
        console.log("Erro na rota de fazer check in => ", error)
        return res.status(500).json({msg: "Erro na rota de fazer check in => ", error})
    }

        
}