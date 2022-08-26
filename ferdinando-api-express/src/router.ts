import {Router, Response, Request} from 'express'
import { Controller } from './controller'
import { DefinedMiddlewares } from './defined-middlewares'
import { DefinedRoutes } from './defined-routes'
import { Middleware } from './middleware'
import cors from 'cors'

export const router = Router()
const authenticatedRouter = Router()

authenticatedRouter.use(Middleware[DefinedMiddlewares.Authentication])
authenticatedRouter.get('/get-my-orders', Controller[DefinedRoutes.GetMyOrders])
authenticatedRouter.post('/create-user-order', Controller[DefinedRoutes.CreateUserOrder])

router.use(cors())
router.use(Middleware[DefinedMiddlewares.Log])
router.post('/create-seller', Controller[DefinedRoutes.CreateSeller])
router.post('/login-seller', Controller[DefinedRoutes.LoginSeller])
router.use(authenticatedRouter)


