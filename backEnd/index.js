import express from "express";
import cors from "cors";
import pool from "./db.js";
import { fileURLToPath } from "url";
import path from "path";
// dotenv import
import dotenv from dotenv;
// dotenv config
dotenv.config();

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.set("static routing", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving the html pages with js and css
app.use(express.static(path.join(__dirname, "public")));

// login and register page servering
app.get("/EcoKart", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "loginandregister.html"));
});
// landing page servering
app.get("/EcoKart/home", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "landing.html"));
});
// product page serving
app.get("/EcoKart/product", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "product.html"));
});
// cart page serving
app.get("/EcoKart/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "cart.html"));
});
// profile page serving
app.get("/EcoKart/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "profile.html"));
});

// -----------------------------------------------------------------------------------------------------------------

// api routes exposed to the frontend.
// sending items data (landing page)
app.get("/EcoKart/data", async (req, res) => {
    try {
        let response = await pool.query("select * from product");
        if (response.rows.length > 0) {
            // console.log(response.rows);
            res.status(200).json({ message: response.rows });
        } else {
            res.status(400).json({ message: " no data found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
});
// api routes exposed to the frontend.
// login data (login page)
app.post("/EcoKart/login", async (req, res) => {
    try {
        let {email,pass} = req.body;
        let response = await pool.query("select id,email,password from users where email = $1",[email]);
        if (response.rows.length > 0) {
            if(response.rows[0].email===email && response.rows[0].password===pass){
            // console.log(response.rows[0].id);
            res.status(200).json({ message: response.rows[0].id});
            } else {
                res.status(403).json({message:"unauthorised"});
            }
        } else {
            res.status(401).json({ message: "login uncessessful" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
        console.log(error);
    }
});

// api routes exposed to the frontend.
// register data (register page)
app.post("/EcoKart/register", async (req, res) => {
    try {
        const {name,email,pass,phone,address} = req.body;
        let test = await pool.query("select id from users where email = $1",[email]);
        if(test.rows.length>0){
            res.status(400).json({message:" This email is already Registered"});
            return;
        }
        let response = await pool.query("insert into users(name,email,password,phone,address) values($1,$2,$3,$4,$5)returning id;",[name,email,pass,phone,address]);
        if(response.rows.length>0){
            res.status(201).json({id:response.rows[0].id});
        }  else {
            res.status(401).json({message:"Regiteration Unsuccessful"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
        console.log(error);
    }
});

// api routes exposed to the frontend.
// sending data for individual product(s).
app.get("/EcoKart/productdata/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let response = await pool.query("select * from product where id = $1", [id]);
        if (response.rows.length > 0) {
            // console.log(response.rows);
            res.status(200).json({ message: response.rows });
        } else {
            res.status(400).json({ message: " no data found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
});
// api routes exposed to the frontend.
// sending users data (for profile page).
app.get("/EcoKart/Users/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        let response = await pool.query("select name,email,address,phone from users where id = $1", [uid]);
        if (response.rows.length > 0) {
            // console.log(response.rows);
            res.status(200).json({ message: response.rows });
        } else {
            res.status(400).json({ message: " no user found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error);
    }
})



// app listener...
try {
    const connection = await pool.connect(); // first connect and test
    connection.release(); // then close the connection if everything is ok...
    app.listen(PORT, () => {
        console.log(`DataBase connected \nApp is Listening on Port ${PORT} \napp is running....`);
    });
} catch (error) {
    console.log("DataBase connection failed...");
}