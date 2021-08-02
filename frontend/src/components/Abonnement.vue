<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light rounded bg-success">
            <a class="navbar-brand" href="#">Microblog</a>
            <router-link :to="{ name: 'Index' }" class="btn" v-if="feed">
                Fil d'actualité
            </router-link>
            <router-link :to="{ name: 'Register' }" class="btn" v-if="register">
                Register
            </router-link>
            <router-link :to="{ name: 'Login' }" class="btn" v-if="login">
                Login
            </router-link>
            <router-link :to="{ name: 'Profil' }" class="btn" v-if="profil">
                Profil
            </router-link>
            <router-link :to="{ name: 'Publier' }" class="btn" v-if="publier">
                Publier un post
            </router-link>
            <router-link
                :to="{ name: 'Abonnement' }"
                class="btn"
                v-if="abonnement"
            >
                Mes abonnements
            </router-link>
            <button class="btn" v-if="deconnexion" v-on:click="deco">
                Deconnexion
            </button>
        </nav>
        <br />
        <h3>Mes Abonnements :</h3>
        <div>
            <div v-for="item in abonnementList" :key="item.idUser">
                <div
                    class="border rounded col-md-auto px-5 py-4 shadow bg-white text-center"
                >
                    {{item.name}} - @{{ item.nickname }}
                    <button
                        class="btn btn-primary"
                        @click="deleteAbonnement(item.idUser)"
                    >
                        Se désabonner
                    </button>
                </div>
            </div>
        </div>
        <br />
        <div>
            <label for="pseudo">Rechercher un utilisateur : </label>
            <input type="text" id="pseudo" name="pseudo" v-model="pseudo" />
        </div>
        <p>Recherche pour le pseudo : {{ pseudo }}</p> 
        <div>
            <div v-for="item in users" :key="item.idUser">
                <div
                    v-if="
                        item.nickname !== dataUser.nickname &&
                            pseudo.length != 0 &&
                            item.nickname.includes(pseudo) && !checkAbonnement(item.idUser)
                    "
                    class="border rounded col-md-auto px-5 py-4 shadow bg-white text-center"
                >
                    {{item.name}} - @{{ item.nickname }}
                    <button
                        class="btn btn-primary"
                        @click="addAbonnement(item.idUser)"
                    >
                        S'abonner
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data: function() {
        return {
            dataUser: { fullname: "", nickname: "", email: "" },
            abonnementList: [],
            users: [],
            idAbonnementList: [],
            id: "",
            img: "",
            feed: true,
            register: false,
            login: false,
            profil: true,
            deconnexion: true,
            publier: true,
            abonnement: false,

            pseudo: "",
        };
    },

    async created() {
        await this.getDataUser();
        await this.getAbonnementList();
        await this.getIdAbonnementList();
        await this.getAllUsers();
    },

    methods: {

        checkAbonnement(idUser) {
            return this.idAbonnementList.includes(idUser);
        },

        getIdAbonnementList() {
            this.idAbonnementList = []
            this.abonnementList.forEach((user) => {
                this.idAbonnementList.push(user.idUser);
            });
        },

        async addAbonnement(idAbonnement) {
            try {
                const response = await axios.post(
                    `http://localhost:5000/api/abonnements/${idAbonnement}`,
                    {
                        idUser: this.id,
                    }
                );
                console.log(response);
                await this.getAbonnementList();
                this.getIdAbonnementList();
            } catch (err) {
                console.log(err);
            }
        },

        async deleteAbonnement(idAbonnement) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/api/abonnements/${idAbonnement}`,
                    {
                        data: { idUser: this.id },
                    }
                );
                console.log(response);
                await this.getAbonnementList();
                this.getIdAbonnementList();
            } catch (err) {
                console.log(err);
            }
        },

        async getAbonnementList() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/abonnements/${this.id}`
                );
                console.log(response);
                this.abonnementList = response.data;
            } catch (err) {
                console.log(err);
            }
        },

        async getAllUsers() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/users"
                );
                console.log(response);
                this.users = response.data;
            } catch (err) {
                console.log(err);
            }
        },

        async getDataUser() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                //console.log("Abonnement - getData");
                console.log(response);
                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;

                this.id = response.data[0].user.idUser;
                this.img = response.data[0].user.avatar;
            } catch (err) {
                console.log(err);
            }
        },

        async deco() {
            console.log("deconnexion");
            console.log(this.dataUser);
            try {
                await axios
                    .post("http://localhost:5000/api/dataUser", {
                        id: this.id,
                        email: this.dataUser.email,
                        name: this.dataUser.fullname,
                        nickname: this.dataUser.nickname,
                    })
                    .then(
                        (response) => {
                            console.log(response);
                            this.$router.push({ name: "Index" });
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
