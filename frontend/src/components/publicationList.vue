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
        <br> 
        <div class="row">
            <div
                class="form-group form-check offset-1 rounded px-5 py-4 shadow bg-white text-left"
            >
                <div>
                    <input
                        type="checkbox"
                        v-model="everyone"
                        id="everyone"
                        name="everyone"
                        checked
                    />
                    <label for="everyone">@everyone</label>
                </div>
                <div>
                    <input
                        v-if="dataUser.nickname.length != 0"
                        type="checkbox"
                        v-model="mention"
                        id="mention"
                        name="mention"
                        checked
                    />
                    <label v-if="dataUser.nickname.length != 0" for="mention"
                        >Mes Mentions @{{ dataUser.nickname }}</label
                    >
                </div>
                <div>
                    <input
                        v-if="dataUser.nickname.length != 0"
                        type="checkbox"
                        v-model="ownPost"
                        id="ownPost"
                        name="ownPost"
                        checked
                    />
                    <label v-if="dataUser.nickname.length != 0" for="ownPost"
                        >Mes publications</label
                    >
                </div>
                <input
                    v-if="dataUser.nickname.length != 0"
                    type="checkbox"
                    v-model="abonne"
                    id="abonne"
                    name="abonne"
                    checked
                />
                <label v-if="dataUser.nickname.length != 0" for="abonne"
                    >Publications de mes abonnements</label
                >
                <div>
                    <label for="hashtag">hashtag : </label>
                    <input
                        type="text"
                        id="hashtag"
                        name="hashtag"
                        v-model="hashtag"
                    />
                </div>
                <p>Recherche pour le hashtag : {{ hashtag }}</p>
            </div>
            <div
                class="col-md-8 justify-content-center align-items-center"
            >
                <div
                    class="col-md-8 rounded px-5 py-4 shadow bg-white text-left"
                >
                    <form id="publier" v-on:submit.prevent="submit">
                        <div class="row">
                            <div class="col-12 form-group">
                                <label class="col-form-label col-form-label-lg"
                                    >Publication :
                                    <span class="text-danger">*</span></label
                                >
                                <input
                                    type="text"
                                    v-model.trim="$v.post.$model"
                                    :class="{
                                        'is-invalid': validationStatus($v.post),
                                    }"
                                    class="form-control form-control-lg"
                                    value="post"
                                />
                                <div
                                    v-if="!$v.post.required"
                                    class="invalid-feedback"
                                >
                                    Champs vide
                                </div>
                            </div>

                            <div class="col-12 form-group text-center">
                                <button class="btn btn-vue btn-lg col-4">
                                    Publier
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <br>
        <div v-for="item in publications" :key="item.idPublication">
            <div
                v-if="
                    (everyone && item.content.includes('@everyone')) ||
                        (mention &&
                            dataUser.nickname.length != 0 &&
                            item.content.includes(
                                '@'.concat(dataUser.nickname)
                            )) ||
                        (ownPost && item.author === dataUser.id) ||
                        (hashtag.length != 0 &&
                            hashtag.startsWith('#') &&
                            item.content.includes(hashtag)) ||
                        (abonne && checkAbonnement(item.author))
                "
                class="border rounded px-5 py-4 shadow bg-white text-left"
            >
                <img
                    :src="require('../images/' + item.avatar)"
                    width="100px"
                    height="110px"
                    alt="profilepicture"
                />
                {{ item.nickname }} - {{ item.content }} <br />
                {{ item.date }} <br />
                Like: {{ item.nbLike }} - Dislike: {{ item.nbDislike }}
                <br />
                <router-link
                    :to="{
                        name: 'Commentary',
                        params: { id: item.idPublication },
                    }"
                >
                    Commentaire
                </router-link>
                <button
                    class="btn btn-primary"
                    @click="repostPublication(item)"
                    v-if="publier"
                >
                    Repost
                </button>
                <router-link
                    :to="{ name: 'Edit', params: { id: item.idPublication } }"
                    class="btn btn-success"
                    v-if="item.nickname === dataUser.nickname"
                >
                    Edit
                </router-link>
                <button
                    class="btn btn-danger"
                    @click="deletePublication(item.idPublication)"
                    v-if="item.nickname === dataUser.nickname"
                >
                    Supprimer
                </button>
                <button
                    class="btn btn-primary"
                    @click="likePublication(item.idPublication)"
                    v-if="publier"
                >
                    Like
                </button>
                <button
                    class="btn btn-primary"
                    @click="dislikePublication(item.idPublication)"
                    v-if="publier"
                >
                    Dislike
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { required } from "vuelidate/lib/validators";

export default {
    data: function() {
        return {
            publications: [],
            abonnementList: [],
            idAbonnementList: [],
            timer: "",
            dataUser: { fullname: "", nickname: "", email: "", id: "" },
            id: "",
            feed: false,
            register: true,
            login: true,
            profil: false,
            deconnexion: false,
            publier: false,
            abonnement: false,

            //SECTION POUR LE FILTRE DES PUBLICATION
            everyone: true,
            mention: true,
            ownPost: true,
            abonne: true,
            hashtag: "",

            post: "@everyone",
        };
    },

    validations: {
        post: { required },
    },

    async created() {
        await this.getData();
        await this.getAbonnementList();
        await this.getIdAbonnementList();
        await this.getPublications();
        this.timer = setInterval(this.getPublications, 10000);
    },

    methods: {
        resetData: function() {
            this.post = "@everyone";
        },

        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        submit: async function() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            await axios
                .post("http://localhost:5000/api/publier", {
                    idUser: this.dataUser.id,
                    post: this.post,
                })
                .then(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            swal("Bien joué !", "Publication posté !", "success");
            this.$v.$reset();
            this.resetData();
        },

        cleanTheDate(dateStr) {
            return new Date(dateStr)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "");
        },

        checkAbonnement(author) {
            return this.idAbonnementList.includes(author);
        },

        getIdAbonnementList() {
            this.abonnementList.forEach((user) => {
                this.idAbonnementList.push(user.idAbonnement);
            });
        },

        async getAbonnementList() {
            try {
                if (this.id !== ""){
                    const response = await axios.get(
                        `http://localhost:5000/api/abonnements/${this.id}`
                    );
                    console.log(response);
                    this.abonnementList = response.data;
                }
            } catch (err) {
                console.log(err);
            }
        },

        filterPublication(publication) {
            if (this.dataUser.nickname === "") {
                return publication.content.includes("@everyone");
            } else {
                return (
                    publication.author === this.dataUser.id ||
                    publication.content.includes("@everyone") ||
                    publication.content.includes(
                        "@".concat(this.dataUser.nickname)
                    ) ||
                    this.checkAbonnement(publication.author)
                );
            }
        },

        //Get Publications
        async getPublications() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/publications"
                );
                this.publications = response.data.filter((publication) =>
                    this.filterPublication(publication)
                );
                this.publications.forEach(
                    (publication) =>
                        (publication.date = this.cleanTheDate(publication.date))
                );
            } catch (err) {
                console.log(err);
            }
        },

        async getData() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                console.log(response);
                const menu = response.data[0].menu;
                this.id = response.data[0].user.idUser;
                console.log(menu);
                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;
                this.dataUser.id = response.data[0].user.idUser;
                console.log(this.dataUser);
                this.register = menu.register;
                this.login = menu.login;
                this.profil = menu.profil;
                this.deconnexion = menu.deconnexion;
                this.publier = menu.publier;
                this.abonnement = menu.abonnement;
            } catch (err) {
                console.log(err);
            }
        },

        //Delete publications
        async deletePublication(id) {
            swal({
                title: "En êtes vous sur ?",
                text:
                    "Une fois supprimé, vous ne pourrez pas récupérer votre merveilleux post !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    try {
                        axios
                            .delete(
                                `http://localhost:5000/api/publications/${id}`
                            )
                            .then((response) => {
                                console.log(response);
                                this.getPublications();
                            });
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    swal("Votre post est encore vivant !");
                }
            });
        },

        async likePublication(id) {
            try {
                await axios.put(
                    `http://localhost:5000/api/publications/like/${id}`
                );
                this.getPublications();
            } catch (err) {
                console.log(err);
            }
        },

        async dislikePublication(id) {
            try {
                await axios.put(
                    `http://localhost:5000/api/publications/dislike/${id}`
                );
                this.getPublications();
            } catch (err) {
                console.log(err);
            }
        },

        async repostPublication(publication) {
            try {
                await axios.post(
                    `http://localhost:5000/api/publications/repost`,
                    {
                        data: publication,
                        idUser: this.id,
                    }
                );
                this.getPublications();
                swal(
                    "Bien joué !",
                    "Vous avez reposté la publication",
                    "success"
                );
            } catch (err) {
                console.error(err);
            }
        },

        resetConnect() {
            this.dataUser.fullname = "";
            this.dataUser.nickname = "";
            this.dataUser.email = "";
            this.dataUser.id = "";
            this.id = "";
            this.register = true;
            this.login = true;
            this.deconnexion = false;
            this.profil = false;
            this.publier = false;
            this.abonnement = false;
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
                            this.resetConnect();
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
