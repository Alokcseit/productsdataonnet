import {DB_NAME} from "../constant.js"
import mongoose from "mongoose"
const connectDB=async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`
         ,{
            writeConcern:{
                w:"majority"
            }
         });
         console.log("database connected")
         console.log(connectionInstance.connection.db.databaseName)
    } catch (error) {
        console.log(error)
        process.exit(1)  
    }
}
export {connectDB}