import {Request, Response} from "express";
import { send } from "process";
import sql from './db';
import { validarToken } from "./middleware";
import { User } from "./types";

export const cadastrarController = async (req: Request, res: Response) => {
  let login = req.body.login
  let password = req.body.password

  try {
    const users = await sql`
      insert into tseller
        (login , password)
      values
        (${ login }, ${ password })`
    console.log(login,password)
    res.send('success')
  } catch (error: any) {
    if (error.code === '23505') {
      return res.send('user already has account')
    }
    return res.send('internal server error')
  }
}

export const loginController = async (req: Request, res: Response) => {
  const login = req.body.login
  const password = req.body.password

  if (!login || !password) {
    return res.send('"login" are "password" required')
  }

  try {
    const queryResult = await sql`SELECT login, password, token FROM tseller WHERE login = ${login}`
    
    if (queryResult.length === 0) {
      return res.send('"login" or "password" invalid')
    }

    if (queryResult[0].password !== password) {
      return res.send('"password" invalid')
    }

    return res.send(queryResult[0].token)
  } catch (error) {
    return res.send('internal server error')
  }
}

export const retornaController = async(req : Request, res: Response) => {
    try {
      const queryResult = await sql`SELECT login , password , token FROM tseller`
      return res.send(queryResult)
    } catch (error) {
      return res.send('internal server error')
    }
}

export const createOrderController = async (req : Request, res: Response) => {
  //let user_id = req.body.user_id
  let total = req.body.total
  let data = req.body.date
  let token = req.body.token   

  if (!total || !data) {
    return res.send('Faltou campos')
  }

  try {
    const user: User = res.locals.user
    const order = await sql`INSERT INTO torder(user_id, total, date) VALUES (${user.id}, ${total}, ${data}) RETURNING *`
    res.send(order)
    } catch (error: any) {
      if (error.code == "23503"){
        return res.send('Usuário não encontrado')
      }
      if(error.code == "22P02"){
        return res.send('Acesso negado').status(403)
      }
      console.log(error,error.code)
      return res.send('error')
    }
}

export  const findMyOrderController = async(req : Request , res : Response) => {

  try {
    const user: User = res.locals.user
    console.log(user)
    const queryResult = await sql`SELECT id, user_id, total, date From torder WHERE user_id = ${user.id}`
    return res.send(queryResult)

  } catch (error: any) {
    console.log(error)
    res.send('erro interno')
  }
    
}


// export const create_order_controller = async ()



/*async function insertUser({ name, age }) {
    const users = await sql`
      insert into login
        (login , senha)
      values
        (${ login }, ${ senha })
      //returning name, age
    `
    // users = Result [{ name: "Murray", age: 68 }]
    return users
  }*/