import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import axios from "axios";

import Register from "./components/SignupForm.vue";
import Login from "./components/SigninForm.vue";
import Index from "./components/publicationList.vue";
import Commentary from "./components/Commentary.vue";
import Edit from "./components/Edit.vue";
import Profil from "./components/MyProfil.vue";
import Modify from "./components/ModifyProfil.vue";
import EditComment from "./components/EditComment.vue";
import Publier from "./components/Publier.vue";
import Abonnement from "./components/Abonnement";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

const routes = [{
        name: "Register",
        path: "/register",
        component: Register,
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
    {
        name: "Index",
        path: "/",
        component: Index,
    },
    {
        name: "Commentary",
        path: "/commentary/:id",
        component: Commentary,
    },
    {
        name: "Edit",
        path: "/Edit/:id",
        component: Edit,
    },
    {
        name: "EditComment",
        path: "/EditComment/:id",
        component: EditComment,
    },
    {
        name: "Profil",
        path: "/profil",
        component: Profil,
    },
    {
        name: "Modify",
        path: "/setProfil",
        component: Modify,
    },
    {
        name: "Publier",
        path: "/Publier",
        component: Publier,
    },
    {
        name: "Abonnement",
        path: "/Abonnement",
        component: Abonnement,
    },
];

/* creation de l'instance du routeur */
const router = new VueRouter({ mode: "history", routes: routes });

new Vue({
    // init router
    router,
    render: (h) => h(App),
}).$mount("#app");