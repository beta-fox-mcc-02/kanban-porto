<template>
  <section class="container">
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
            <form class="update-form" v-if="showForm" v-on:submit.prevent="editTask">
                <div>
                    <label>New title</label>
                    <input type="text" v-bind:value="title">
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
            validUser: true
        }
    },
    props: {
        task: Object
    },
    methods: {
        deleteTask(taskId){
            let token = localStorage.getItem('access_token')
            axios({
                method: "DELETE",
                url: `http://localhost:3000/task/delete/${taskId}`,
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
                url: `http://localhost:3000/task/update/${taskId}`,
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
        editTask(){
            console.log(this.title, this.tag)
        }
    }
}
</script>