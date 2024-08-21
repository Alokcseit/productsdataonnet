import * as dotenv from "dotenv"
import { connectDB } from "./db/index.js"
dotenv.config(
    {
        path: "./.env"
    }
)

import {app} from "./app.js"

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})