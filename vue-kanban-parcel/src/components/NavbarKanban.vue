<template>
    <div>
        <label>KANBAN BOARD</label>
        <button 
            v-if="statusUser === 'logout'" 
            @click="login"
        >
        Login</button>

        <button 
            v-else 
            @click="logout"
        >
        Logout</button>
    </div>
</template>


<script>

export default {
    name: "NavbarKanban",
    props: {
        statusUser : String
    },
    methods : {
        login() {
            this.$emit('changePage', 'login')
        },
        logout(){
            this.$emit('changePage', 'logout')
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>