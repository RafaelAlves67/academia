import { Sequelize } from 'sequelize'
import dotenv from 'dotenv' 
dotenv.config() 

const sequelize = new Sequelize('academia', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
}) 

export default sequelize
