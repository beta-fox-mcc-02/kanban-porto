<template>
  <!-- MAIN VIEW -->
        <div class="main-view">
          <!-- LEFT BAR -->
          <div class="option">
            <div class= "top">
              <ul>
                <li><a><i class="fas fa-user-circle"></i></a></li>
                <li><a><i class="fas fa-search"></i></a></li>
                <li><a v-on:click="showFormAdd" style="cursor: pointer"><i class="fas fa-plus"></i></a></li>
              </ul>
            </div>
            <div class="bottom">
              <ul>
                <li><a><i class="fas fa-bell"></i></a></li>
                <li><a><i class="fas fa-cog"></i></a></li>
                <li><a v-on:click="logout" style="cursor: pointer"><i class="fas fa-sign-out-alt"></i></a></li>
              </ul>
            </div>
          </div>
  
          <!-- CENTER BAR -->
          <div class="menu-bar">
            <div class="menu-top">
                <div class="intro-profile">
                    <div class="avatar">
                        <a><i class="fas fa-user-tie"></i></a>
                    </div>
                    <div class="name-profile">
                        <h6>{{dataUserIdTask.user.name}}</h6>
                    </div>
                </div>
                  <div class="kanban">
                      <div class="icon">
                          <a><i class="fas fa-border-all"></i></a>
                      </div>
                      <div class="name-profile">
                          <h6>kanban-board</h6>
                      </div>
                  </div>
            </div>
            <div class="history">
              <h4>History</h4>
            </div>
  
          </div>
  
          <!-- RIGHT BAR -->
          <div class="content">
            <div class="title">
                <h2>Kanban Board</h2>
            </div>
            <div class="search">
                <h3>Search</h3>
            </div>
  
            <!-- KANBAN BOARD -->
            <div class="kanban-board">
                <!-- {{categories}} -->
                <Categories class="backlog" 
                    v-for="category in categories" 
                    :key="category.id" 
                    :category="category"
                    :tasks="dataUserIdTask.tasks"
                    @deleteTask="deleteTask"
                    @showEditForm="showEditForm"
                    @updateSucces="updateSucces"
                    ></Categories>
            </div>
          </div>
          <b-modal id="add-task" hide-footer>
 
            <div class="d-block text-center">
                <center>
                    <form style="" v-on:submit.prevent="addNewTask">
                        <h2>Add New Task</h2>
                        <br>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" class="form-control" v-model="newTask.title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text" id="description" class="form-control" v-model="newTask.description">
                        </div>
                        <br><br>
                        <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
                    </form>
                </center>
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide(`add-task`)" style="background-color:red">Cancel</b-button>
        </b-modal>
        </div>
</template>

<script>
import axios from 'axios'
import Categories from "./Category"

export default {
    name : "MainView",
    props : {
        dataUserIdTask : Object
    },
    components : {
        Categories
    },
    data() {
        return {
            categories : [],
            newTask : {
                title : "",
                description : ""
            }
        }
    },
    methods : {
        logout() {
            this.$emit('actionLogout')
        },

        getAllCategories() {
            axios({
                method : "GET",
                url : "https://young-retreat-16880.herokuapp.com/categories"
            })
                .then(({ data }) => {
                    this.categories = data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },

        deleteTask() {
            this.$emit('deleteTask')
        },
        showFormAdd () {
            // this.currentPage = 'addTaskPage'
            this.$bvModal.show(`add-task`)
            // this.$emit('moveFormAdd')
        },
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
                    this.$bvModal.hide(`add-task`)
                    this.$emit('refetch')
                })
                .catch(response => {
                    console.log(response.data)
                })
        },
        showEditForm(dataTaskToEdit) {
            this.$emit('showEditForm', dataTaskToEdit)
        },
        updateSucces() {
            this.$emit('updateSucces')
        }
        
    },
    computed: {
        
    },
    created() {
        this.getAllCategories()
    }
}
</script>

<style>

</style>