import Exercise from "../models/ExerciseModel.js"
import User from "../models/UserModel.js"
import WorkoutExercise from "../models/WorkourExerciteModel.js"
import Workout from "../models/WorkoutModel.js"

export async function cadastrarFicha(req,res){

    try {
        const {id_instrutor, id_aluno, descricao, dias_da_semana} = req.body 

        if(!id_instrutor || !id_aluno || !dias_da_semana){
            return res.status(400).json({msg: "Insira os campos necessários"})
        }
    
        const userAluno = await User.findOne({
            where: {id: id_aluno},
            tipo: "Aluno"
        }) 
    
        if(!userAluno){
            return res.status(400).json({msg: "Aluno não encontrado!"})
        }

        const ficha = await Workout.create({
            id_aluno: id_aluno,
            id_instrutor: id_instrutor,
            descricao: descricao,
            dias_da_semana: dias_da_semana
        })

        return res.status(200).json({msg: "Ficha cadastrada", ficha})
       
    } catch (error) {
        console.log("Erro na rota de cadastrar ficha => ", error)
        return res.status(500).json({msg: "Erro na rota de cadastrar ficha => ", error})
    }
}

export async function deleteFicha(req,res){
    try {
        const {id} = req.params 

        if(!id){
            return res.status(400).json({msg: "Informe o id"})
        }
    
        const ficha = await Workout.findByPk(id)
    
        if(!ficha){
            return res.status(400).json({msg: "Ficha não encontrada."})
        }
        
        await Workout.destroy({where:{ id: id}})

    } catch (error) {
        console.log("Erro na rota de deletar ficha => ", error)
        return res.status(500).json({msg: "Erro na rota de deletar ficha => ", error})
    }
}


export async function getFicha(req,res){
    try {
        const {id_aluno} = req.params

    if(!id_aluno){
        return res.status(400).json({msg: "Informe o id do aluno"})
    }

    const fichas = await Workout.findAll({
        where: {id_aluno: id_aluno}
    })

    if(fichas.length === 0){
        return res.status(400).json({msg: "Nenhuma ficha encontrada para esse usuário."})
    }

    return res.status(200).json(fichas)   
    } catch (error) {
        console.log("Erro na rota de listar fichas => ", error)
        return res.status(500).json({msg: "Erro na rota de listar fichas => ", error})
    }
}


export async function editFicha(req,res){
    try {
        const { id ,descricao, dias_da_semana} = req.body 

        if(!dias_da_semana){
            return res.status(400).json({msg: "Informe o dia da semana"})
        } 

        const ficha = await Workout.findByPk(id)
        if(!ficha){
            return res.status(400).json({msg: "Nenhuma ficha encontrada."})
        }

        const fichaUpdate = await Workout.update({
            descricao: descricao,
            dias_da_semana: dias_da_semana} , 
            { 
            where: {
                id: id 
            }
        })

        return res.status(200).json({msg: "Ficha editada", fichaUpdate})

    } catch (error) {
        console.log("Erro na rota de editar ficha => ", error)
        return res.status(500).json({msg: "Erro na rota de editar ficha => ", error})
    }
}


export async function getFichaComExercicios(req,res){
    try {
        const {id_aluno} = req.params

    if(!id_aluno){
        return res.status(400).json({msg: "Informe o id do aluno"})
    }

    const fichas = await Workout.findAll({
        include: [
            {
                model: WorkoutExercise,
                include: [
                    {
                    model: Exercise,
                    attributes: ["nome", "grupo_muscular"]
                    }
                ]
                
            }, 
            
        ],
        where: {id_aluno: id_aluno}
    })

    if(fichas.length === 0){
        return res.status(400).json({msg: "Nenhuma ficha encontrada para esse usuário."})
    }

    return res.status(200).json(fichas)   
    } catch (error) {
        console.log("Erro na rota de listar fichas => ", error)
        return res.status(500).json({msg: "Erro na rota de listar fichas => ", error})
    }
}