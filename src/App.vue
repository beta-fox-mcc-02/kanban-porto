<template>
    <div class="d-flex flex-column">
        <Header 
            :isLogedIn="isLogedIn"
            @changeIsLogedIn="changeIsLogedIn"
            @changePage="changePage"
        ></Header>
        <SignIn 
            @changePage="changePage"
            @changeIsLogedIn="changeIsLogedIn"
            :currentPage="currentPage" 
            :isLogedIn="isLogedIn"
        ></SignIn>
        <SignUp 
            @changePage="changePage"
            @changeIsLogedIn="changeIsLogedIn"
            :currentPage="currentPage"
            :isLogedIn="isLogedIn"
        ></SignUp>
        <Board
            :isLogedIn="isLogedIn"
            v-if="currentPage === 'board' || isLogedIn"
            @changePage="changePage"
        ></Board>
    </div>
</template>

<script>
    import Header from './components/Header'
    import SignIn from './components/SignIn'
    import SignUp from './components/SignUp'
    import Board from './components/Board'

    export default {
        name: 'App',
        data() {
            return {
                isLogedIn: false,
                currentPage: 'signIn'
            }
        },
        components: {
            Header,
            SignIn,
            SignUp,
            Board
        },
        methods: {
            changePage: function(page) {
                this.currentPage = page
            },
            changeIsLogedIn(status) {
                this.isLogedIn = status
            }
        },
        created() {
            if (localStorage.getItem('token')) {
            // this.fetchTask()
            this.isLogedIn = true
        } else {
            this.isLogedIn = false
        }
        }
    }
</script>