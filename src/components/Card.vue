<template>
    <div class="card-body">
        <h5 class="card-title">{{task.title}}</h5>
        <p class="card-text">{{task.description}}</p>
        <div class= "event-issue">
            <a v-on:click="showFormEdit(task.id)" style="cursor: pointer">Edit</a>
            <a v-on:click="deleteTask(task.id)" style="cursor: pointer"><i class="fas fa-trash-alt"></i></a>
        </div>

        <b-modal :id="`bv-modal-example${task.id}`" hide-footer>
 
            <div class="d-block text-center">
                <center>
                <form style="" v-on:submit.prevent="updateTask(dataTask.id)">
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
                        </select>
                    </div>
                    <br>
                    <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
                </form>
            </center>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide(`bv-modal-example${task.id}`)" style="background-color:red">Cancel</b-button>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : "Card",
    props : {
        task : Object
    },
    data() {
        return {
            dataTask : {},
            categories : []
        }
    },
    methods : {
        
        deleteTask(id) {
            axios({
                method : "DELETE",
                url : `https://young-retreat-16880.herokuapp.com/tasks/` + id,
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => {
                    this.$emit('deleteTask')
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        showFormEdit(id) {
            this.currentPage = 'updateTaskPage'
            axios({
                method : "GET",
                url : `https://young-retreat-16880.herokuapp.com/tasks/` + id,
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => {
                    this.dataTask = response.data.dataTask
                    this.categories = response.data.dataCategories
                    this.$bvModal.show(`bv-modal-example${id}`)
                })
                .catch(response => {
                    console.log(response.data)
                })  
        },
        updateTask(id){
            axios({
                method : "PUT",
                url : `https://young-retreat-16880.herokuapp.com/tasks/` + id,
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
                    this.$bvModal.hide(`bv-modal-example${id}`)
                    this.$emit('updateSucces')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed : {
        dataTaskToEdit() {
            return {
                dataTask : this.dataTask,
                categories : this.categories
            }
        }
    }
}
</script>

<style>

</style>