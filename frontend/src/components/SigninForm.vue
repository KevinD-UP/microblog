<template>
    <div class="container-fluid h-75">
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
        <div
            class="col-md-12 h-100 d-flex justify-content-center align-items-center"
        >
            <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left">
                <form id="signup-form" v-on:submit.prevent="submit">
                    <div class="row">
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Email <span class="text-danger">*</span></label
                            >
                            <input
                                type="email"
                                v-model.trim="$v.email.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.email),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.email.required"
                                class="invalid-feedback"
                            >
                                The email field is required.
                            </div>
                            <div
                                v-if="!$v.email.email"
                                class="invalid-feedback"
                            >
                                The email is not valid.
                            </div>
                        </div>
                        <div class="col-12 form-group">
                            <label class="col-form-label col-form-label-lg"
                                >Password
                                <span class="text-danger">*</span></label
                            >
                            <input
                                type="password"
                                v-model.trim="$v.password.$model"
                                :class="{
                                    'is-invalid': validationStatus($v.password),
                                }"
                                class="form-control form-control-lg"
                            />
                            <div
                                v-if="!$v.password.required"
                                class="invalid-feedback"
                            >
                                The password field is required.
                            </div>
                        </div>
                        <div class="col-12 form-group text-center">
                            <button class="btn btn-vue btn-lg col-4">
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
    name: "SigninForm",
    data: function() {
        return {
            email: "",
            password: "",
            feed: true,
            register: true,
            login: false,
            profil: false,
            deconnexion: false,
            publier: false,
            abonnement: false,
        };
    },
    validations: {
        email: { required, email },
        password: { required },
    },
    methods: {
        resetData: function() {
            this.email = "";
            this.password = "";
        },
        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        submit: async function() {
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            await axios
                .post("http://localhost:5000/api/login", {
                    email: this.email,
                    password: this.password,
                    feed: true,
                    register: false,
                    login: false,
                    profil: true,
                    deconnexion: true,
                    publier: true,
                    abonnement: true,
                })
                .then(
                    (response) => {
                        console.log(response);
                        console.log("connexion reussie\n");
                        this.$router.push({ name: "Index" });
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            this.$v.$reset();
            this.resetData();
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
<style>
.btn-vue {
    background: #53b985;
    color: #31485d;
    font-weight: bold;
}
</style>
