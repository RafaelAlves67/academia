import { where } from "sequelize";
import Exercise from "../models/ExerciseModel.js";
import {Op} from "sequelize";

export async function registrarExercicio(req,res){
    try {
        const {nome, grupo_muscular} = req.body 
 
        if(!nome || !grupo_muscular){
            return res.status(400).json({msg: "Preencha os campos do cadastro 2."})
        }   

        const verificaExercicioExist = await Exercise.findOne({
            where: {
                nome: nome,
                grupo_muscular: grupo_muscular
            }
        })

        if(verificaExercicioExist){
            return res.status(400).json({msg: "Exercicio cadastrado!"})
        }

        const novoExercicio = await Exercise.create({
            nome, grupo_muscular
        })

        return res.status(200).json({msg: "Exercicio cadastrado", novoExercicio})
    } catch (error) {
        console.log("Erro na rota de cadastrar exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de cadastrar exercicio = > ", error})
    }
}


// DELETAR
export async function deletarExercicio(req,res){
    try {
    
        const id = req.params.id 

        if(!id){
            return res.status(400).json({msg: "Informe o exercicio."})
        }

        const exercicio = await Exercise.findByPk(id)
        if(!exercicio){
            return res.status(400).json({msg: "Exercicio não encontrado"})
        }

        await Exercise.destroy({where: {id: id}})
        return res.status(200).json({msg: "Exercicio deletado."})
    } catch (error) {
        console.log("Erro na rota de deletar exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de deletar exercicio = > ", error})
    }
}

export async function editarExercicio(req,res){
    try {
        const {id, nome, grupo_muscular} = req.body 
 
        if(!nome || !grupo_muscular){
            return res.status(400).json({msg: "Preencha os campos do cadastro 2."})
        }   

        const verificaExercicioExist = await Exercise.findByPk(id)
        if(!verificaExercicioExist){
            return res.status(400).json({msg: "Exercicio cadastrado!"})
        }

        const exercicioAlterado = await Exercise.update(
            { 
                nome: nome,
                grupo_muscular: grupo_muscular 
            },
            {
                where: {
                    id: id
                }
            } 
        )

        return res.status(200).json({msg: "Exercicio editado", exercicioAlterado})
    } catch (error) {
        console.log("Erro na rota de editar exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de editar exercicio = > ", error})
    }
}


export async function listarExercicio(req,res){
    try{
        const exercicios = await Exercise.findAll()

        if(exercicios.length === 0){
            return res.status(400).json({msg: "Nenhum exercicio encontrado"})
        } 
    
        return res.status(200).json(exercicios)
    }catch(error){
        console.log("Erro na rota de listar exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de listar exercicio = > ", error})
    }
}

export async function pesquisarExercicioNome(req,res){
    try {
        const {nome} = req.params
        console.log(nome)
        if(!nome){
            return res.status(400).json({msg: "Informe a pesquisa."})
        }

        const exercicios = await Exercise.findAll({
            where: {
                nome: {
                    [Op.iLike]: `${nome}%`
                } 
            }
        })

        if(exercicios.length === 0){
            return res.status(400).json({msg: "Nenhum exercicio encontrado!"})
        }

        return res.status(200).json(exercicios)
    } catch (error) {
        console.log("Erro na rota de pesquisar exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de pesquisar exercicio = > ", error})
    }
}

export async function filtrarPorGrupoMuscular(req,res){
  try {
    const {grupo_muscular} = req.params 

    if(!grupo_muscular){
        return res.status(400).json({msg: "Informe o grupo muscular"})
    }

    const exercicios = await Exercise.findAll({
        where: {
            grupo_muscular: grupo_muscular
        }
    })

    if(exercicios.length === 0){
        return res.status(400).json({msg: "Nenhum exercicio encontrado!"})
    }

    return res.status(200).json(exercicios)
  } catch (error) {
    console.log("Erro na rota de filtrar por grupo muscular exercicio = > ", error)
        return res.status(500).json({msg: "Erro na rota de filtrar por grupo muscular exercicio = > ", error})
  }
}

