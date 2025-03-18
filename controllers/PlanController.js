import Plan from "../models/PlanModel.js";

export async function createPlano(req,res){
    try {
        const {nome, preco,  duracao} = req.body 

        if(!nome || !preco || !duracao){
            return res.status(400).json({msg: "Todos campos são obrigatórios."})
        }   

        const plano = await Plan.create({
            nome: nome, // (Mensal, trimenstral, semestral, anual)
            preco: preco, // (1 mes - 90$ / 3 meses - 250$ / 6 meses - 540$ / 12 meses - 980$)
            duracao: duracao // EM MESE (1, 3, 6, 12)
        })

        return res.status(200).json({msg: "Plano de matricula criado!", plano})
    } catch (error) {
        console.log("Erro na rota de criar plano => ", error)
        return res.status(500).json({msg: "Erro na rota de criar plano => ", error})
    }
}

export async function deletePlano(req,res){
    try {
        const {id} = req.pamars.id 

        const plano = await Plan.findByPk(id)
        if(!plano){
            return res.status(400).json({msg: "Plano de matricula não encontrado!"})
        }   

        
        await Plan.destroy({where: {id: id}})
        return res.status(400).json({msg: "Plano de matricula excluído."})
    } catch (error) {
        console.log("Erro na rota de deletar plano => ", error)
        return res.status(500).json({msg: "Erro na rota de deletar plano => ", error})
    }
}

export async function editPlano(req,res){
    try {
        const {id , nome, preco,  duracao} = req.body 

        if(!id || !nome || !preco || !duracao){
            return res.status(400).json({msg: "Todos campos são obrigatórios."})
        }   
    
        const plano = await Plan.findByPk(id)
        if(!plano){
            return res.status(400).json({msg: "Plano de matricula não encontrado!"})
        }   
    
        const planoEdit = await Plan.update({nome: nome, preco: preco, duracao: duracao}, {where: {id: id}})
        return res.status(400).json({msg: "Plano de matricula editado!", planoEdit})   
    } catch (error) {
        console.log("Erro na rota de editar plano => ", error)
        return res.status(500).json({msg: "Erro na rota de editar plano => ", error})
    }
}

export async function getPlanos(req,res){
    try {
        const planos = await Plan.findAll()

        if(planos.length === 0){
            return res.status(400).json({msg: "Nenhum plano cadastrado"})
        }
    
        return res.status(200).json(planos)   
    } catch (error) {
        console.log("Erro na rota de listar planos => ", error)
        return res.status(500).json({msg: "Erro na rota de listar planos => ", error})
    }
}