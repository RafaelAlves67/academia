import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv' 
configDotenv() 
const secret = process.env.SECRET 

// autenticação 
export const authUser = (req,res,next) => {
    const auth = req.headers['authorization'] 
    const token = auth && auth.split(' ')[1] 

    if(!token){
        return res.status(403).json({msg: "Acesso negado!"})
    }

    jwt.verify(token,secret, (error, user) => {
        if(error){
            return res.status(403).json({msg: "Token inválido: ", error})
        }

        req.user = user 
        next();
    })
}   
