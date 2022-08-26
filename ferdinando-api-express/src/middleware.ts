import { RequestHandler, Request, Response, NextFunction } from "express";
import { DefinedMiddlewares } from "./defined-middlewares";
import { sql } from './db'
import * as expressWinston from 'express-winston'
import winston from 'winston'


export const Middleware: Record<DefinedMiddlewares, RequestHandler> = {
  [DefinedMiddlewares.Log]: expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ message, timestamp }) => {
        return `${timestamp}: ${message}` 
      })
    ),
    msg: "HTTP {{req.method}} {{req.url}}",
  }),

  [DefinedMiddlewares.Authentication]: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')
    if (!token) {
      return res.json({ status: 'Error', message: 'Token not found' }).status(403)
    }

    try {
      const validUser = await sql`
        select id 
          from tseller
        where token = ${token}
      `
      if (validUser.length === 0) {
        return res.json({ status: 'Error', message: 'User not found' }).status(403)
      }

      res.locals.idSeller = validUser[0].id
      return next()
    } catch (err: any) {
      console.log(err.code)
      if (err.code === '22P02') {
        return res.json({ status: 'Error', message: 'Invalid token' })
      }
      
      return res.json({ status: 'Error', message: 'Internal server error' }).status(500)
    }
    // const idSeller = check[0].id
  }
}