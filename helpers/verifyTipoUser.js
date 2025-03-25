import User from "../models/UserModel.js"

export async function verifyUser(req,res,next){
    const {id_instrutor} = req.body 

    if(!id_instrutor){
        return res.status(400).json({msg: "Informe o id do instrutor."})
    }

    const instrutor = await User.findOne({
        where: {
            id: id_instrutor,
            tipo: 'Instrutor'
        }
    })

    if(!instrutor){
        return res.status(400).json({msg: "Instrutor não encontrado."})
    }

    next();
}