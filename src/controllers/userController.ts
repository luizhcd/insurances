import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/userRepository';
import BadRequestError from '../errors/badRequestError';
import UnauthenticatedError from '../errors/unauthenticatedError';

class UserController {

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository()
            const user = await userRepository.create(req.body)
            const token = user.createJWT()
            res.status(201).json({ username: user.username, token })
        } catch (err) {
            next(err)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {

            const { username, password } = req.body
            const userRepository = new UserRepository()

            if (!username || !password) {
                throw new BadRequestError('Please provide username and password')
            }
            
            const user = await userRepository.findByUsername(username)
            if (!user) {
                throw new UnauthenticatedError('Invalid Credentials')
            }

            const isPasswordCorrect = await user.comparePassword(password)
            if (!isPasswordCorrect) {
                throw new UnauthenticatedError('Invalid Credentials')
            }

            const token = user.createJWT()
            res.status(200).json({ user: { name: user.username }, token })
        } catch (err) {
            next(err)
        }

    }
}

export default UserController
