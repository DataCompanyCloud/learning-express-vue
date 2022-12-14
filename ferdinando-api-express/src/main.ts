import express from 'express'
import { router } from './router'

const app = express();
app.use(express.json());
app.use(router)

app.listen(3005, () => {
    console.log("Listening on port 3005")
})
