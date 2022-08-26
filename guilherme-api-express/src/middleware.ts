import sql from "./db"
import { NextFunction, Response, Request } from "express"
import { User } from "./types"

export async function validarToken (req: Request, res: Response, next:NextFunction){
  try {
    let token = req.headers.token as string
    const validUser: User[] = await sql`SELECT * FROM tseller WHERE token = ${token}`
    // return validUser.length === 0 ? false :
    if (validUser.length > 0) {
      res.locals.user = validUser[0]
      return next()
    }

    return res.send('Token inválido').status(403)
  } catch (error: any) {
    if (error.code = '22P02') {
      return res.send('Token não conforme')
    }
    return res.send('Erro interno')
  }
}