import mongoose from "mongoose";



const auth0Schema = new mongoose.Schema({
    username : {type : String , required : true},
   email : {type : String , required : true},
   image : {type : String, required : true }
   
},{timestamps : true})


export const Autho = mongoose.model("Autho",auth0Schema);