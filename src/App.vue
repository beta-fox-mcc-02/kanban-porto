<template>
    <div>
        <Navbar @changePage="changePage" :currentPage="currentPage"></Navbar>
        <Register v-if="currentPage === 'register'"></Register>
        <Login v-else-if="currentPage === 'login'"></Login>
    </div>
</template>

<script>
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'

export default {
    data () {
        return {
            currentPage: 'register'
        }
    },
    components: {
        Navbar,
        Register,
        Login
    },
    methods: {
        changePage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style>

</style>