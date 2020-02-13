<template>
  <section class="container">
        <div>
            <span class="content-tag" v-bind:style="task.tag === 'low priority' ? 'background-color: #3d92a2' : 'background-color: #b71b1b'"> {{ task.tag }} </span>
            <span class="content-title">{{task.title}}</span>
        </div>
        <span class="content-edit">
            <i class="fas fa-ellipsis-v" v-on:click="updateTask(task)"></i>
            <i class="far fa-trash-alt" v-on:click="deleteTask(task.id)"></i>
        </span>
  </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MainCards-Child',
    data() {
        return {
            currentPage: ''
        }
    },
    props: {
        task: Object
    },
    methods: {
        deleteTask(id){
            axios({
                method: "DELETE",
                url: `http://localhost:3000/task/delete/${id}`
            })
            .then((data) => this.$emit('changePage', { page: 'member' }))
            .catch((err) => console.log(err))
        }
    }
}
</script>