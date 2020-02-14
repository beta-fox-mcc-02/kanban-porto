<template>
  <div id="update-todo">
            <center>
                <form style="width:25%;" v-on:submit.prevent="updateTask(dataTask.id)">
                    <h2>Update Task</h2>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" id="edit-title" class="form-control" v-model="dataTask.title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" id="edit-description" class="form-control" v-model="dataTask.description">
                    </div>
                    <div id="edit-status">
                        <label>Category : </label>
                        <select name="status" v-model="dataTask.CategoryId">
                            <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">{{category.name}}</option>
                            <!-- <option v-for="category in categories" :selected="category.id === dataTask.CategoryId ? true : false" v-bind:key="category.id">{{category.name}}</option> -->
                        </select>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </center>
        </div>
</template>

<script>
import axios from 'axios'

export default {
    name : "EditTask",
    props : {
        dataTaskToEdit : Object
    },
    data() {
        return {
               
        }
    },
    methods : {
        updateTask(id){
            console.log('MASUK UPDATE MAIN.JS')
            axios({
                method : "PUT",
                url : `http://localhost:3000/tasks/` + id,
                data : {
                    title : this.dataTask.title,
                    description : this.dataTask.description,
                    CategoryId: +this.dataTask.CategoryId
                },
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => {
                    this.currentPage = 'mainHomePage'
                    this.fetch()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed : {
        dataTask() {
            console.log(dataTaskToEdit.dataTask)
            return dataTaskToEdit.dataTask
        },
        categories() {
            console.log(dataTaskToEdit.categories)
            return dataTaskToEdit.categories
        }
    }, 
    created () {
        console.log(this.dataTaskToEdit, '==========>>>>>>>>>>>')
    }

}
</script>

<style>

</style>