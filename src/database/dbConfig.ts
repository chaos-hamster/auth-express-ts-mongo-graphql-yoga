import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGO_URI || "mongodb://localhost:27017/users";

export default function db() {
    mongoose.connect( 
        url, 
        { 
            useCreateIndex: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }).catch((err) => console.log(err));
}