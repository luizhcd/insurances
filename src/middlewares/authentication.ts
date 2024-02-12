import jwt from 'jsonwebtoken'
import UnauthenticatedError from "../errors/unauthenticatedError"

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}
