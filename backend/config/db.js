import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb=async()=>{
    try {
         mongoose.connection.on('connected',()=>{
            console.log("DB CONNECTED");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/Sihproject`);
       
    } catch (error) {
       console.log("DB CONNECTION ERROR: ",error);   
    }
}

export default connectDb;