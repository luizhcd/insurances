import express from 'express'
import UserController from '../controllers/userController'

const userRouter = express.Router()
const userController = new UserController()

userRouter.route('/').post(userController.createUser)
userRouter.route('/login').post(userController.login)

export default userRouter
