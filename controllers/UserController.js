import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv"; 
configDotenv() 

const secret = process.env.SECRET


export const registerUser = async (req,res) => {

    try {
        
        const {nome, email, password, confirmPassword, tipo, phone } = req.body 

        const tiposUser = ['Aluno', 'Instrutor', 'Admin']

        if(!nome){
            return res.status(400).json({msg: "Preencha o nome para finalizar o cadastro."})
        }

        if(!email){
            return res.status(400).json({msg: "Preencha o email para finalizar o cadastro."})
        }

        if(!password){
            return res.status(400).json({msg: "Preencha a senha para finalizar o cadastro."})
        }

        if(!confirmPassword){
            return res.status(400).json({msg: "Preencha a confirmação de senha para finalizar o cadastro."})
        }


        if(!tipo){
            return res.status(400).json({msg: "Preencha o tipo para finalizar o cadastro."})
        }

        if(!phone){
            return res.status(400).json({msg: "Preencha o telefone para finalizar o cadastro."})
        }

        if(!tiposUser.includes(tipo)){
            return res.status(403).json({msg: "Tipo de usuário inválido"})
        }


        if(password !== confirmPassword){
            return res.status(400).json({msg: "As senhas não se correspondem."})

        } 

        if(phone.length !== 11 || /[a-zA-Z]/.test(phone)){
            return res.status(403).json({msg: "Número de celular inválido"})
        }
        

        const emailExist = await User.findOne({where: {email: email}}) 
        const phoneExist = await User.findOne({where: {phone: phone}}) 

        if(emailExist){
            return res.status(200).json({msg: "E-mail já cadastrado!"})
        }

        if(phoneExist){
            return res.status(200).json({msg: "Celular já cadastrado!"})
        }

        const salt = 12 
        const hashPassword = await bcrypt.hash(password, salt)


        const newUser = await User.create({nome, email, password: hashPassword, tipo, phone}) 
        return res.status(200).json({msg: "Usuário criado com sucesso", newUser})
    
    } catch (error) {
        console.log("Erro na rota de registrar usuário => " + error)
    }
}

export const loginUser = async (req,res) => {

    try {
        const {email, password} = req.body 

        if(!email){
            return res.status(400).json({msg: "Preencha o email para efetuar o login"})
        }
    
        if(!password){
            return res.status(400).json({msg: "Preencha a senha para efetuar o login"})
        } 
    
        const emailExist = await User.findOne({where: {email: email}})  
    
        if(!emailExist){
            return res.status(400).json({msg: "E-mail não encontrado!"}) 
        } 
    
        const checkPassword = await bcrypt.compare(password, emailExist.password) 
    
        if(checkPassword){
            const token = jwt.sign({id: emailExist.id}, secret)
            return res.status(200).json({msg: "Login realizado com sucesso.", token})
        }else{
            return res.status(403).json({msg: "Senha incorreta!"})
        }
    } catch (error) {
        console.log("Erro na rota de login => " + error)
    }
}

export const editUser = async (req,res) => {
    const {nome, email, password, tipo, phone, id} = req.body  
    const newUser = {nome, email, password, tipo, phone, id}

    try {
        if(!nome){
            return res.status(400).json({msg: "Preencha o nome para finalizar o update."})
        }

        if(!email){
            return res.status(400).json({msg: "Preencha o email para finalizar o update."})
        }

        if(!password){
            return res.status(400).json({msg: "Preencha a senha para finalizar o update."})
        }

        if(!tipo){
            return res.status(400).json({msg: "Preencha o tipo para finalizar o update."})
        }

        if(!phone){
            return res.status(400).json({msg: "Preencha o telefone para finalizar o update."})
        } 


        const userExist = await User.findByPk(id) 

        if(!userExist){
            return res.status(403).json({msg: `Usuário com id ${id} não encontrado`}) 
        }

        const hasChange = Object.keys(newUser).some(key => userExist[key] !== newUser[key]) 
        
        if(!hasChange){
            return res.status(400).json({msg: "Não houve alteração. Realize o update"})
        } 

        const userEdit = await User.update(newUser, {where: {id: id}})

        return res.status(200).json({msg: "Usuário editado", userEdit}) 
    } catch (error) {
        console.log("Erro na rota de edit user => " + error)
    }
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id 

        const userExist = await User.findByPk(id) 

        if(!userExist){
            return res.status(400).json({msg: "Usuário não encontrado"})
        } 

        await User.destroy({where: {id: id}}) 
        return res.status(200).json({msg: "Usuário excluído.", userExist})   
    } catch (error) {
        console.log("Erro na rota de delete user => " + error)
    }
}

