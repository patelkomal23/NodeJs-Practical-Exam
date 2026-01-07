//  Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

//  Core imports
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

//  Routes & DB
import router from "./routes/index.js";
import connectDB from "./config/db.js";

const app = express();

//  __dirname fix (ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  MongoDB Connection
connectDB();

//  View Engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//  Static Files (CSS / JS / Images)
app.use(express.static(path.join(__dirname, "public")));

//  Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use("/", router);



//  Server Start
const PORT = process.env.PORT || 8018;
app.listen(PORT, () => {
  console.log("=================================");
  console.log("Server started successfully");
  console.log(`http://localhost:${PORT}`);
  console.log("=================================");
});
