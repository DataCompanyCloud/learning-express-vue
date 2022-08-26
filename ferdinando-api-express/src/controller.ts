import { Request, RequestHandler, Response } from "express"
import { DefinedRoutes } from './defined-routes'
import {sql} from './db'

export const Controller: Record<DefinedRoutes, RequestHandler> = {
    [DefinedRoutes.CreateSeller]: async (req: Request, res: Response) => {
        const email: string = req.body.email
        const password: string = req.body.password

        if (!email || !password) {
            return res
                .json({ status: 'Error', message: 'Validation error' })
                .status(400)
        }

        try {
            const seller = await sql`
            insert into tseller
            (email, password)
            values
            (${ email }, ${ password })`
            return res
                .json({status: 'Created', message: 'Seller created with success!' })
                .status(200)

        } catch (err: any) {
            console.log(err.code)
            if (err.code === '23505'){
                return res
                    .json({status: 'Error', message: 'Email already exists' })
                    .status(409)
            }

            return res
                .json({status: 'Error', message: 'Internal server error' })
                .status(500)
        }
    },

    [DefinedRoutes.LoginSeller]: async (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password

        console.log("Logging")

        if( !email || !password){
            return res
                .status(400)
                .json({ status: 'Error', message: 'Datas invalids' })
                
        }

        try{
            const login = await sql`
                select token
                from tseller
                where email = ${email} and password = ${password}
            `

            return res
                .json({ status: 'Ok', token: login[0].token })
                .status(200)
        } catch (err: any) {
            if(err.code === undefined){
                return res
                    .status(400)
                    .json({ status: 'Invalidation', message: 'Incorrect email or password, please try again' })                    
            }
                        
            return res
                .status(400)
                .json({ status: 'ERROR', message: 'Impossible connect with database' })
                
        }
    },
 
    [DefinedRoutes.CreateUserOrder]: async (req: Request, res: Response) => {   
        const description = req.body.order.description
        const quantity = req.body.order.quantity
        const total = req.body.order.total
        const { idSeller } = res.locals

        if ( !description || !quantity || !total) {
            return res
                .json({ status: 'Error', message: 'Valitation error' })
                .status(400)    
        }

        try {
            await sql`
            insert into torder
                (id_seller, description,  quantity, total)
            values
                (${idSeller}, ${description}, ${quantity}, ${total})`
            
            return res
                .json({ status: 'Ok', message: 'Order create with successfully!' })
                .status(200)
        } catch (err: any) {
            return res
                .json({ status: 'Error', message: 'Impossible connect with database' })
                .status(400) 
        }            
    },

    [DefinedRoutes.GetMyOrders]: async (req: Request, res: Response) => {
        const idSeller = res.locals.idSeller

        try {
            const orders = await sql`
                select * 
                from torder
                where id_seller = ${idSeller}
            `

            return res
                .json({ status: 'OK', data: orders })
                .status(200)
        } catch (err: any){
            return res
                .json({ status: 'Error', message: 'Impossible connect with database' })
                .status(400)
        }
    }

}