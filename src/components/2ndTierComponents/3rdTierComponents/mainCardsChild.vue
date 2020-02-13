<template>
  <section class="container">
        <div>
            <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
            <span class="content-title">{{task.title}}</span>
            <span class="content-possession">{{task.User.name}}'s Task</span>
        </div>
        <span class="content-edit">
            <i class="fas fa-ellipsis-v" v-on:click="updateTask(task)"></i>
            <i class="far fa-trash-alt" v-if="validUser" v-on:click="deleteTask(task.id)"></i>
            <i class="far fa-trash-alt" v-else-if="!validUser" v-bind:style="!validUser ? 'background-color: white; color: red; border-radius: 50%; cursor: not-allowed' : ''"></i>
        </span>
  </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MainCards-Child',
    data() {
        return {
            currentPage: '',
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
        }
    }
}
</script>