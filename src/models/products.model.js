import mongoose from "mongoose";
 const productsSchema= new mongoose.Schema({
    productId:{
        type:String,
        
    },
    title:{
        type:String,
        required:true
    },
    descryption:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    ,quantity:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
 },{timestamps:true})

 export const productsonnet=mongoose.model("products",productsSchema)