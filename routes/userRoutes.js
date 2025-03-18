import { Router } from "express"
import { registerUser, loginUser, editUser, deleteUser } from "../controllers/UserController.js"
import { authUser } from "../helpers/verifyToken.js"

const userRoute = Router()

// rotas publicas (cadastro e login)
userRoute.post("/register", registerUser)
userRoute.post("/sign", loginUser) 

// edit usuario 
userRoute.put("/edit", authUser, editUser)
userRoute.delete("/delete/:id", authUser, deleteUser)

export default userRoute 