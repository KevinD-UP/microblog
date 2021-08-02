//Import function from user model
import {
    getUsers,
    insertUser,
    connectUser,
    updateUser,
} from "../models/userModel.js";

const USER = [];

// Get All Publication
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Create User
export const createUser = (req, res) => {
    const data = req.body;
    insertUser(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// user connects to the microblog
export const connection = (req, res) => {
    const data = req.body;
    connectUser(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            USER.push(results);
            res.json(results);
        }
    });
};

export const informationUser = (req, res) => {
    res.json(USER);
};

export const deleteUser = (req, res) => {
    const data = req.body;
    let compteur = 0;
    const indice = [];
    /*console.log("delete")
    console.log(data)*/
    for (let x of USER) {
        console.log(x);
        if (
            x.user.email == data.email &&
            x.user.nickname == data.nickname &&
            x.user.idUser == data.id
        ) {
            indice.push(compteur);
        }
        compteur = compteur + 1;
    }
    console.log(indice);
    for (let n of indice) {
        console.log(n);
        const tmp = USER[n];
        USER[n] = USER[USER.length - 1];
        USER[USER.length - 1] = tmp;

        USER.pop();
    }
    /*console.log("test deco")
    console.log(USER)*/
    res.json(USER);
};

export const updateProfil = (req, res) => {
    const data = req.body;

    updateUser(data, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            let compteur = 0;
            const indice = [];
            let saveUser = "";
            for (let x of USER) {
                if (
                    x.user.idUser == data.idUser
                ) {
                    indice.push(compteur);
                    saveUser = x;
                }
                compteur = compteur + 1;
            }
            
            const u = {
                idUser: result.idUser,
                name: result.fullname,
                email: result.email,
                nickname: result.nickname,
                password: saveUser.user.password,
                avatar: saveUser.user.avatar,
            };
            const m = {
                register: saveUser.menu.register,
                login: saveUser.menu.login,
                profil: saveUser.menu.profil,
                deconnexion: saveUser.menu.deconnexion,
                publier: saveUser.menu.publier,
                abonnement: saveUser.menu.abonnement,
            };
            const resultat = { user: u, menu: m };
            
            for (let n of indice) {
                const tmp = USER[n];
                USER[n] = USER[USER.length - 1];
                USER[USER.length - 1] = tmp;

                USER.pop();
            }

            USER.push(resultat);
            res.json(resultat);
        }
    });
};