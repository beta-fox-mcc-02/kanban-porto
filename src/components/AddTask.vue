<template>
  <div id="add-task">
        <center>
            <form style="width:25%;" v-on:submit.prevent="addNewTask">
                <h2>Add Todo</h2>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" class="form-control" v-model="newTask.title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="description" class="form-control" v-model="newTask.description">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </center>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'AddTask',
    data() {
        return {
            newTask : {
                title : "",
                description : ""
            } 
        }
    },
    methods : {
        addNewTask() {
            console.log('MASUK ADD NEW TASK')
            axios({
                method : "POST",
                url : "https://young-retreat-16880.herokuapp.com/tasks",
                data : {
                    title : this.newTask.title,
                    description : this.newTask.description
                },
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => { 
                    console.log('MASUK THEN')
                    this.$emit('refetch')
                    // this.fetch()
                    // this.currentPage = 'mainHomePage'
                })
                .catch(response => {
                    console.log(response.data)
                })
        }
    }
}
</script>

<style>

</style>