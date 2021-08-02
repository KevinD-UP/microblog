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
            <router-link :to="{ name: 'Abonnement' }" class="btn" v-if="abonnement">
                Mes abonnements
            </router-link>
            <button class="btn" v-if="deconnexion" v-on:click="deco">
                Deconnexion
            </button>
        </nav>
        <br />
        <div class="border rounded col-md-auto px-5 py-4 shadow bg-white text-center">
                    <p>avatar : </p>
                    <img
                        :src="require('../images/'+dataUser.avatar)"
                        width="100px"
                        height="100px"
                        alt="profilepicture"
                    /> <br> <br>

                    name :
                    <p>{{ dataUser.fullname }}</p>
       
                    nickname :
                    <p>{{ dataUser.nickname }}</p>
          
                    email :
                    <p>{{ dataUser.email }}</p>
         
            <router-link :to="{ name: 'Modify' }" class="btn btn-primary">
                Modifier Profil
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data: function() {
        return {
            dataUser: { fullname: "", nickname: "", email: "", avatar: ""},
            id: "",
            userProfilePic: null,
            feed: true,
            register: false,
            login: false,
            profil: false,
            deconnexion: true,
            publier: true,
            abonnement: true,

            timer: "",
        };
    },

    async created() {
        await this.getDataUser();
    },

    methods: {

        getImage () {
            this.userProfilePic = '../images/'+this.dataUser.avatar
        },
        
        async getDataUser() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/dataUser"
                );
                console.log(response);

                this.dataUser.fullname = response.data[0].user.name;
                this.dataUser.nickname = response.data[0].user.nickname;
                this.dataUser.email = response.data[0].user.email;
                this.id = response.data[0].user.idUser;
                this.dataUser.avatar = response.data[0].user.avatar;
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
