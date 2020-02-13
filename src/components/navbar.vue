<template>
    <nav>
        <div class="nav-left">
            <i class="fab fa-dochub" style="font-size: 30px;"></i>
        </div>
        <div class="nav-center">
            <button type="button" class="btn btn-primary" v-if="currentPage === 'landing'">ADD PROJECT</button>
        </div>
        <div class="nav-right">
            <button type="button" class="btn btn-primary" v-if="currentPage === 'register'" v-on:click.prevent="changePage('login')">LOGIN</button>
            <button type="button" class="btn btn-success" v-if="currentPage === 'login'" v-on:click.prevent="changePage('register')">REGISTER</button>
            <button type="button" class="btn btn-danger" v-if="currentPage === 'landing'" @click="logout">LOGOUT</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: {
        currentPage:String
    },
    data () {
        return {

        }
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        },
        logout () {

        }
    }
}
</script>

<style>

</style>