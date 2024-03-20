require("dotenv").config()
import express from 'express';
import mongoose from 'mongoose';
import morgan from "morgan"
import helmet from "helmet"
import errorMiddleware from './API/middlewares/error';
import routes from "./API/routes"
import cors from "cors"
import { corsOptions } from './config/CorsOptions';

const app = express()

const mongodb_uri = process.env.MONGO_URI
const PORT = process.env.PORT || 4000

mongoose.connect(mongodb_uri).then((res) => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(`AT mongoose connect:`)
    console.log(err.message)
})


app.use(express.json())
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
// logger middleware
app.use(morgan('dev'))
// security
app.use(helmet())




//add routea
app.get('/', (_req, res) => {
    res.send('Hello Server! 🚀')
})

app.use('/api', routes)

app.use(errorMiddleware)

app.use((_req, res) => {
    res.status(404).send({ ok: true, msg: 'Whoops!! You are lost go back to documentation to find your way back to Home again 😂' })
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})