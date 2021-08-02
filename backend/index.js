// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import publicationRouter from "./routes/publicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentaryRoutes from "./routes/commentaryRoutes.js";
import abonnementRoutes from "./routes/abonnementRoutes.js";

// init express
const app = express();

// use express body-parser and json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use cors
app.use(cors());

// use router
app.use(publicationRouter);
app.use(userRoutes);
app.use(commentaryRoutes);
app.use(abonnementRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));