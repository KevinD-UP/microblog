//Here put all request to database about abonnement
//import database
import db from "../config/database.js";

// Get All Subscribes
export const getAbonnements = (result) => {
    db.query("SELECT * FROM abonnement", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Get Single Subscribes
export const getAbonnementById = (id, result) => {
    db.query(
        `SELECT * FROM user WHERE EXISTS (SELECT idAbonnement FROM abonnement WHERE abonnement.idUser=${id} AND user.idUser<>${id} AND user.idUser=abonnement.idAbonnement)`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Add new abonnement
export const addNewAbonnement = (idUser, idAbonnement, result) => {
    db.query(
        `INSERT INTO abonnement (idUser, idAbonnement) VALUE (${idUser}, ${idAbonnement})`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};

// Delete abonnement
export const deleteAbonnement = (idUser, idAbonnement, result) => {
    db.query(
        `DELETE FROM abonnement WHERE idUser=${idUser} AND idAbonnement=${idAbonnement}`,
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};