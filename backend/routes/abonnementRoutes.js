// import express
import express from "express";

// import function from controller
import {
    showAbonnements,
    showAbonnementById,
    showNewAbonnement,
    showDeletedAbonnement,
} from "../controllers/abonnement.js";

// init express router
const router = express.Router();

// Get All Subscribers
router.get("/api/abonnements", showAbonnements);

// Get single Subscribe
router.get("/api/abonnements/:id", showAbonnementById);

// Add Abonnement
router.post("/api/abonnements/:id", showNewAbonnement);

// Delete Abonnement
router.delete("/api/abonnements/:id", showDeletedAbonnement);

// export default router
export default router;