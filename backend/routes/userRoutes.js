// import express
import express from "express";

// import function from controller
import {
    showUsers,
    createUser,
    connection,
    informationUser,
    updateProfil,
    deleteUser,
} from "../controllers/user.js";

// init express router
const router = express.Router();

router.get("/api/users", showUsers);

router.post("/api/register", createUser);

router.post("/api/login", connection);

router.get("/api/dataUser", informationUser);

router.put("/api/setProfil", updateProfil);

router.post("/api/dataUser", deleteUser);

// export default router
export default router;