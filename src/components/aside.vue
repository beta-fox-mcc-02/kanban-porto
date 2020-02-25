<template>
    <div>
        <aside id="sidebar">
            <div>
                <button><i class="fas fa-users" v-on:click="showUsers"></i></button>
                <small>Members</small>
                <span v-if="currentPage === 'showUsers'">
                    <i class="far fa-times-circle" id="close-user-desc" v-on:click="close"></i>
                    <div id="users-container" v-for="user in users" v-bind:key="user.name">
                        <div class="desc">
                            <div class="user"> {{user.name}} </div>
                            <div  v-if="user.totalTask >= 2"> Has {{user.totalTask}} Tasks </div>
                            <div v-else-if="user.totalTask == 1"> Has only {{user.totalTask}} Task </div>
                            <div v-else> Has no Task </div>
                        </div>
                    </div>
                </span>
            </div>
            <div>
                <button><i class="fas fa-plus-circle" v-on:click="showFormAdd"></i></button>
                <small>Add new task</small>
            </div>
        </aside>
    <AddTaskComponent v-on:changePage="changePage" v-if="currentPage === 'newtask'"></AddTaskComponent>
    </div>
</template>

<script>
import AddTaskComponent from './TaskCreation.vue'

export default {
    data() { 
        return {
            currentPage: '',
            users: []
        } 
    },
    methods: {
        showFormAdd() { 
            this.currentPage = 'newtask'
            this.$emit('changePage', { page: this.currentPage })
        },
        changePage(fromChild) {
            this.currentPage = fromChild.page
            this.$emit('changePage', { page: fromChild.page })
        },
        showUsers() {
            axios({
                method: "GET",
                url: "https://desolate-mountain-17477.herokuapp.com/user"
            })
            .then((result) => {
                this.users = result.data.result
                this.currentPage = 'showUsers'
            })
            .catch((err) => console.log(err))
        },
        close() { this.currentPage = 'member' }
    },
    components: { AddTaskComponent }
}
</script>

<style>

</style>