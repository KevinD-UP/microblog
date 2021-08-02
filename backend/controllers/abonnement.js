// Import function from abonnement Model
import {
    getAbonnements,
    getAbonnementById,
    addNewAbonnement,
    deleteAbonnement,
} from "../models/abonnementModel.js";

// Get All Publication
export const showAbonnements = (req, res) => {
    getAbonnements((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showAbonnementById = (req, res) => {
    getAbonnementById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showNewAbonnement = (req, res) => {
    const data = req.body.idUser;
    addNewAbonnement(data, req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const showDeletedAbonnement = (req, res) => {
    const data = req.body.idUser;
    deleteAbonnement(data, req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};