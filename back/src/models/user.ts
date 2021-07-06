import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : { type : String },
    lastName : { type : String },
    age : { type : Number },
    username : { type : String },
    email : { type : String },
    password : { type : String },
    createdAt : { type : Date, default : Date.now() }
});

export const User = mongoose.model("User", userSchema);