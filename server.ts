import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));

app.use("/api/user", userRouter);

const URI = process.env.MONGODB_URL;

if(URI){
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }as ConnectOptions, err => {
        if (err) throw err;
        console.log("Connected to DB")
    });
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
}