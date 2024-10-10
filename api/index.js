import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();


const app= express();

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Conexión exitosa"))

app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Hola desde mi servidor :)");
})

app.listen(4000,()=>console.log("server is running"))