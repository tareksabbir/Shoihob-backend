/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import config from '../../../config'
import { NextFunction, Request, Response } from 'express'
import { UserData } from '../User/User.model'
import { Admin } from '../Admin/Admin.model'

declare module 'express' {
  interface Request {
    decoded?: any // Change 'any' to the actual type of the decoded object if possible
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' })
  }
  const token = authorization.split(' ')[1]
  jwt.verify(token, config.tokens as string, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: 'Forbidden access' })
    }
    req.decoded = decoded
    next()
  })
}

export const verifyAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.decoded.email
  const query = { email: email }
  const user = await UserData.findOne(query)
  if (user?.role !== 'admin') {
    return res.status(403).send({ error: true, message: 'forbidden message' })
  }
  next()
}
export const verifySuperAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.decoded.email
  const query = { email: email }
  const user = await Admin.findOne(query)
  if (user?.role !== 'superAdmin') {
    return res.status(403).send({ error: true, message: 'forbidden message' })
  }
  next()
}

const jwtService = (req: Request, res: Response) => {
  const user = req.body
  const token = jwt.sign(user, config.tokens as string, { expiresIn: '1h' })
  res.send({ token })
}

export const tokenJWTService = {
  jwtService,
}
