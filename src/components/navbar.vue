<template>
    <nav>
        <div class="nav-left">
            <i class="fab fa-dochub" style="font-size: 30px;"></i>
        </div>
        <div class="nav-center">
            <button type="button" class="btn btn-primary" v-if="currentPage === 'landing'">ADD TASK</button>
        </div>
        <div class="nav-right">
            <button type="button" class="btn btn-primary" v-if="currentPage === 'register'" v-on:click.prevent="changePage('login')">LOGIN</button>
            <button type="button" class="btn btn-success" v-if="currentPage === 'login'" v-on:click.prevent="changePage('register')">REGISTER</button>
            <button type="button" class="btn btn-danger" v-if="currentPage === 'landing'" @click.prevent="changePage('login')">LOGOUT</button>
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
            localStorage.clear()
            this.changePage(page)
        }
    }
}
</script>

<style>

</style>