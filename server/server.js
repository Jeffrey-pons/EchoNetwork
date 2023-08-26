import express from "express";
import bodyParser from "body-parser";
import "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { createPost } from "./controllers/post.controllers.js";
import { register } from "./controllers/auth.controllers.js";
import { verifyToken } from "./middleware/auth.middleware.js";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import { users, posts } from "./data/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// File Storage Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/assets"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

// ROUTE
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

// Serve Static Assets
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img-src 'self' data:;");
  next();
});
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
/* ADD DATA ONE TIME */
// User.insertMany(users);
// Post.insertMany(posts);
