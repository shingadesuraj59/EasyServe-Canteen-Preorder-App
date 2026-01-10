import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connection Successfully!!");
    }
    catch(err){
        console.log(`Error : ${err}`);
    }
}

export default connectDB;