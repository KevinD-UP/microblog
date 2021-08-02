//Here put all request to database about commentary

//import database
import db from "../config/database.js";

// Get all comment
export const getCommentairesById = (id, result) => {
    db.query(
        "SELECT * FROM commentaire, user WHERE idPublication = ? AND commentaire.author=user.idUser ORDER BY commentaire.date DESC", [id],
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

// Get single comment
export const getCommentaireById = (id, result) => {
    db.query(
        "SELECT * FROM commentaire, user WHERE idCommentaire = ? AND commentaire.author=user.idUser", [id],
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

// Delete Commentaire to Database
export const deleteCommentaireById = (id, result) => {
    db.query(
        "DELETE FROM commentaire WHERE idCommentaire = ?", [id],
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

// Like Commentaire by id
export const likeCommentaireById = (id, result) => {
    db.query(
        "UPDATE commentaire SET nbLike = nbLike + 1 WHERE idCommentaire = ?", [id],
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

// Like Commentaire by id
export const dislikeCommentaireById = (id, result) => {
    db.query(
        "UPDATE commentaire SET nbDislike = nbDislike + 1 WHERE idCommentaire = ?", [id],
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

export const postCommentaire = (data, result) => {
    db.query(
        `INSERT INTO commentaire (idPublication, author, date, content, nbLike, nbDislike) VALUES (${data.idPublication}, ${data.idUser}, NOW(), "${data.post}", 0, 0)`,
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

// Edit commentaire
export const editCommentaire = (data, result) => {
    console.log(data);
    db.query(
        `UPDATE commentaire SET content = "${data.post}" WHERE idPublication = ${data.idPublication} AND idCommentaire = ${data.idCommentaire}`,
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