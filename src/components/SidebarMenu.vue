<template>
    <ul class="sidenav" id="mobile-demo">
        <li v-if="isLogin">
            <div class="user-view">
                <div class="background">
                    <img src="../../assets/img/sample/photo-1581534104085-003c7da08f7f.jpeg" style="width: 40%;">
                </div>
                <a href="#"><img class="circle" :src="getUserAvatar" :alt="getUserName"></a>
                <a href="#"><span class="white-text name" >{{getUserName}}</span></a>
                <a href="#"><span class="white-text email" ></span>{{getUserEmail}}</a>
            </div>
        </li>
        <div class="side-navbar-container">
            <div v-if="isLogin" id="logged-user-navbar">
                <li @click="toOrganization"><a href="#">Organization</a></li>
                <li @click="signOut" id="sign-out-btn"><a href="#">Sign Out</a></li>
            </div>
            <div v-else id="no-user-navbar">
                <li @click="toRegister" id="sign-up-btn"><a href="#">Sign Up</a></li>
                <li @click="toLogin" id="sign-in-btn"><a href="#">Sign In</a></li>
            </div>
        </div>
    </ul>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SidebarMenu',
    props: {
        isLogin: Boolean,
        user: Object
    },
    data: () => {
        let name = this.user.name
        return {
            userAvatar: `https://robohash.org/${name}?set=set4`
        }
    },
    computed: {
        getUserName() {
            return this.user.name
        },
        getUserEmail() {
            return this.user.email
        },
        getUserAvatar() {
            return `https://robohash.org/${this.user.name}?set=set4`
        }
    },
    methods: {
        toOrganization() {
            this.$emit('toOrganization')
        },
        toLogin() {
            this.$emit('toLogin')
        },
        toRegister() {
            this.$emit('toRegister')
        },
        signOut() {
            localStorage.clear()
            this.$emit('logout')
        }
    }

}
</script>

<style>

</style>