import express from "express"
import path from "path"
import {connectDB} from "./lib/db.js";  // adjust path if needed

import {ENV} from "./lib/env.js"

const app = express();

const __dirname = path.resolve();

app.get("/health" , (req, res) => {
    res.status(200).json({ message: "Hello, everybody!"});
});

app.get("/books" , (req, res) => {
    res.status(200).json({ message: "This is our books."});
});

// make our app ready for deployment
if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}


const startServer = async () => {
    try{
        await connectDB();
        app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
    } catch(error){
        console.log("Error starting the server", error)
    }
};

startServer();