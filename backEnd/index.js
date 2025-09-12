import express from "express";
import cors from "cors";
import pool from "./db.js";
import { fileURLToPath } from "url";
import path from "path";
// dotenv import
// dotenv config
const PORT = 4000;

// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.set("static routing",true);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//serving the html pages with js and css
app.use(express.static(path.join(__dirname,"public")));

// landing page servering
app.get("/EcoKart",( req , res ) =>{
    res.sendFile(path.join(__dirname,"pages","landing.html"));
});



// app listener...
try {
    const connection = await pool.connect(); // first connect and test
    connection.release(); // then close the connection if everything is ok...
    app.listen(PORT,()=> {
    console.log(`DataBase connected \nApp is Listening on Port ${PORT} \napp is running....`);
});
} catch (error) {
    console.log("DataBase connection failed...");
}