require ('express-async-errors')
import express from "express";
import { cadastrarController, createOrderController, findMyOrderController, loginController, retornaController } from "./controller";
import { validarToken } from "./middleware";

const app = express();
app.use(express.json());
app.post('/cadastrar', cadastrarController)
app.post('/login', loginController)
app.get('/retorna-login', retornaController)
app.post('/create-order', validarToken, createOrderController)
app.get('/find-my-orders', validarToken, findMyOrderController)

app.listen(3333, () => console.log("Server running on localhost:3333"))