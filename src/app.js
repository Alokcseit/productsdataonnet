import express,{urlencoded} from "express"
const app=express()
import cors from "cors"
import coockieParser from "cookie-parser"
app.use(express.json(
    {
        limit:"50mb"
    }
))
app.use(coockieParser())
app.use(cors(
    {
        credentials:true,
        origin:"*"
    }
))
app.use(urlencoded({extended:true}))

import productRouter from "./routers/product.router.js"
app.use("/api/v2/products",productRouter)


 export {app}