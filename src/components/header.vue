<template>
    <header>
        <nav id="upperbar">
            <div class="upperbar-menu">LOGO</div>
            <div class="upperbar-menu"> WELCOME {{loginUserName}} </div>
            <div class="upperbar-menu"><button id="logout" v-on:click="logout">Logout</button></div>
            <!-- <GoogleLogin :params="params" :logoutButton=true  @click="logout">Logout</GoogleLogin> -->
        </nav>
    </header>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
    data() {
        return {
            params: {
                client_id: "146329937386-os4lmh278qt7on593p96os957soc0bdf.apps.googleusercontent.com"
            }
        }
    },
    props: {
        loginUserName: String
    },
    components: { GoogleLogin },
    methods: {
        logout() { 
            this.$emit('changePage', { page: `register` })
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log(auth2);
            });
        }
    }
}
</script>