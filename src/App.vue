<template>
    <div>
        <RegisterComponent v-if="currentPage === 'register'" v-on:changePage="changePage"></RegisterComponent>
        <LoginComponent v-if="currentPage === 'login'" v-on:changePage="changePage"></LoginComponent>
        <HeaderComponent v-if="currentPage === 'member'" v-on:changePage="changePage"></HeaderComponent>
        <AsideComponent v-if="currentPage === 'member'" v-on:changePage="changePage"></AsideComponent>
        <MainComponent v-if="currentPage === 'member'" v-on:changePage="changePage" v-bind:categories="categories"></MainComponent>
    </div>
    <!-- <main v-if="currentPage === 'member'">
        <section class="content-box" v-for="category in categories">
            <div class="content-header">
                <h3> {{ category.name }} </h3>
            </div>
            <div class="content-container">
                <div class="content-card" v-for="task in category.Tasks">
                    <div>
                        <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
                        <span class="content-title">{{task.title}}</span>
                    </div>
                    <span class="content-edit">
                        <i class="fas fa-ellipsis-v" v-on:click="updateTask(task)"></i>
                        <i class="far fa-trash-alt" v-on:click="deleteTask(task.id)"></i>
                    </span>
                </div>
            </div>
        </section>
    </main> -->
</template>

<script>
import RegisterComponent from './components/register.vue'
import LoginComponent from './components/login.vue'
import MainComponent from './components/main.vue'
import HeaderComponent from './components/header.vue'
import AsideComponent from './components/aside.vue'

export default {
    name: 'App',
    data() {
        return {
            currentPage: 'register',
            categories: []
        }
    },
    components: { RegisterComponent, LoginComponent, MainComponent, HeaderComponent, AsideComponent },
    methods: {
        changePage(fromChild) {
            this.currentPage = fromChild.page
            if(fromChild.page === 'member') {
                if(fromChild.token) {
                    localStorage.setItem('access_token', fromChild.token)
                }
            }
            else if (fromChild.page === 'register') localStorage.clear()
        },
        fetchAll() {
            axios({
                method: "GET",
                url: "http://localhost:3000/task/findAll"
            })
            .then((result) => {
                console.log(result.data)
                this.categories = result.data})
            .catch((err) => console.log(err))
        }
    },
    created() {
        let access_token = localStorage.getItem('access_token')
        if(access_token) {
            this.currentPage = 'member'
            this.fetchAll()
        }
    }
}
</script>

<style>

</style>