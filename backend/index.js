import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}
var origins = ['http://snorlaxx-server.ddns.net:3000', 'http://localhost:3000', 'http://192.168.0.191']
app.use(cors({ credentials:true, origin: origins}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(8080, ()=> console.log('Server running at port 8080'));