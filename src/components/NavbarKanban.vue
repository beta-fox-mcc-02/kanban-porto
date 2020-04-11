<template>
    <div>
        <label class="title">KANBAN BOARD</label>
        <button 
            class="logout"
            v-if="currentPage === 'login'"
            @click="logout"
        >
        Logout</button>
    </div>
</template>


<script>

export default {
    name: "NavbarKanban",
    props: {
        currentPage : String
    },
    methods : {
        login() {
            this.$emit('changePage', 'login')
        },
        logout(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.$emit('changePage', 'logout')
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>