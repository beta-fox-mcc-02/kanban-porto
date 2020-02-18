<template>
    <div >
        <form 
            id="addTask" 
            class="form" 
            @submit.prevent="addTask"
        >
            <h3>ADD TASK</h3>
            <div class="form-group">
                <label>Title</label><br>
                <input type="text" class="form-control" v-model="newTask.title">
            </div>
            <div class="form-group">
                <label>Description</label><br>
                <input type="text" class="form-control" v-model="newTask.description">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "AddTask",
    data() {
        return {
            newTask : {
                title : "",
                description: ""
            }
        }
    },
    methods: {
        addTask(){
            let newTask = {
                title : this.newTask.title,
                description : this.newTask.description
            }

            axios({
                url: '/tasks',
                method: 'post',
                data: newTask,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(task => {
                    this.$emit('addedTask', 'login')
                })
                .catch(err => {
                    this.$emit('error', 'cannot add task to the kanban')
                })

        }
    }


}
</script>

<style>

</style>