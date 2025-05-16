/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'
const app: Application = express()

// const store_id = process.env.Store_ID
// const store_passwd = process.env.Store_Password
// const is_live = false



app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
}))

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)

// global error handler
app.use(globalErrorHandler)
// handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  // next();
})

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' })
})

export default app
