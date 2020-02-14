<template>
  <nav class="navbar is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand" >
            <a @click="changePage('home')"><img src="../assets/img/kanban-logo2.png" alt="KanbaN"></a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button is-success" v-if="currentPage === 'home'" @click="changePage('create')" >Create</button>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <button class="button is-primary" v-if="currentPage === 'login'" @click="changePage('register')" >Sign Up</button>
                        <button class="button is-warning" v-if="currentPage === 'register'" @click="changePage('login')" >Log In</button>
                        <button class="button is-danger" v-if="currentPage === 'home'" @click="logout">Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name:'navbar',
    props:{
        currentPage:String
    },
    methods:{
        changePage(page){
            this.$emit('changePage', page)
            // console.log(page)
        },
        logout(){
            localStorage.clear()
            this.changePage('login')
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }
    }
}
</script>

<style>

</style>