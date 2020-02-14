<template>
  <section class="container">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
        <div>
            <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
            <span class="content-title">{{task.title}}</span>
            <span class="content-possession">{{task.User.name}}'s Task</span>
        </div>
        <span class="content-edit">
            <i class="fas fa-ellipsis-v" v-if="validUser" v-on:click="showUpdateForm(task.id)"></i>
            <i class="fas fa-ellipsis-v" v-else-if="!validUser" v-bind:style="!validUser ? 'background-color: white; color: red; border-radius: 50%; cursor: not-allowed' : ''"></i>
            <i class="far fa-trash-alt" v-if="validUser" v-on:click="deleteTask(task.id)"></i>
            <i class="far fa-trash-alt" v-else-if="!validUser" v-bind:style="!validUser ? 'background-color: white; color: red; border-radius: 50%; cursor: not-allowed' : ''"></i>
            <form class="update-form" v-if="showForm" v-on:submit.prevent="editTask(task.id)">
                <i class="far fa-times-circle" v-on:click="closeForm"></i>
                <div class="title-form">
                    <label>New title</label>
                    <input type="text" v-model="title">
                </div>
                <div>
                    <label>New priority</label>
                    <select v-model="tag">
                        <option> high priority </option>
                        <option> low priority </option>
                    </select>
                </div>
                <div>
                    <label>Move to</label>
                    <select v-model="changeCategory">
                        <option v-for="categoryName in categoryNames" v-bind:key="categoryName"> {{categoryName}} </option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </span>
  </section>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'MainCards-Child',
    data() {
        return {
            title: '',
            tag: '',
            currentPage: '',
            changeCategory: '',
            showForm: false,
            categoryNames: [],
            validUser: true,
            isLoading: false,
            fullPage: true
        }
    },
    props: {
        task: Object
    },
    components: { Loading },
    methods: {
        deleteTask(taskId){
            let token = localStorage.getItem('access_token')
            axios({
                method: "DELETE",
                url: `https://desolate-mountain-17477.herokuapp.com/task/delete/${taskId}`,
                headers: { token }
            })
            .then((data) => {
                this.validUser = true
                this.$emit('changePage', { page: 'member' })
            })
            .catch((err) => this.validUser = false)
        },
        showUpdateForm(taskId) {
            let token = localStorage.getItem('access_token')
            axios({
                method: 'GET',
                url: `https://desolate-mountain-17477.herokuapp.com/task/update/${taskId}`,
                headers: { token }
            })
            .then((result) => {
                this.showForm = true
                this.validUser = true
                this.categoryNames = result.data.categoryNames
                this.title = result.data.updateReadyTask.title
                console.log(this.title, this.categoryNames)
            })
            .catch((err) => {
                this.validUser = false
                console.log(err)
            })
        },
        editTask(taskId){
            let token = localStorage.getItem('access_token')
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false
            },1000)
            axios({
                method: "PUT",
                url: `https://desolate-mountain-17477.herokuapp.com/task/update/${taskId}`,
                headers: { token },
                data: {
                    title: this.title,
                    tag: this.tag,
                    category: this.changeCategory
                }
            })
            .then((result) => {
                this.clearInputs()
                this.$emit('changePage', { page:'member' })
            })
            .catch((err) => {
                this.clearInputs()
            })
        },
        clearInputs(){
            this.title = '',
            this.tag = '',
            this.currentPage = '',
            this.changeCategory = '',
            this.showForm = false,
            this.categoryNames = [],
            this.validUser = true
        },
        closeForm() {
            this.clearInputs()
            this.$emit('changePage', { page: 'member' })
        },
        onCancel() {
            console.log(`cancel`)
        }
    }
}
</script>