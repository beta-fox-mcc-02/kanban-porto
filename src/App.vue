<template>
  <div>
        <div id="register" v-if="currentPage === 'registerPage'">
            <center>
                <form style="width:25%;" v-on:submit.prevent="createUser">
                    <h2>Register</h2>
                    <div class="form-group">
                        <label for="exampleInputname">Name</label>
                        <input type="text" id="nameRegister" class="form-control" v-model="register.name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" id="emailRegister" class="form-control" v-model="register.email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" id="passwordRegister" class="form-control" v-model="register.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <!-- <h2 style="margin: 30px auto">OR</h2>
                <div id="register-g-sign" class="g-signin2" data-onsuccess="onSignIn"></div> -->
            </center>
        </div>
  
        <!-- LOGIN -->
        <div id="login" v-else-if="currentPage === 'loginPage'">
            <center>
                <form style="width:25%;" v-on:submit.prevent="loginUser">
                    <h2>Login</h2>
                    <div class="form-group">
                        <label for="exampleInputEmail">Email address</label>
                        <input type="email" id="emailLogin" class="form-control" v-model="login.email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword">Password</label>
                        <input type="password" id="passwordLogin" class="form-control" v-model="login.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <!-- <h2 style="margin: 30px auto">OR</h2>
                <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                <!-- <a href="#" onclick="signOut();">Sign out</a> -->
            </center>
        </div>
  
        <div class="main-view" v-else-if="currentPage === 'mainHomePage'">
  
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
                <li><a><i class="fas fa-sign-out-alt"></i></a></li>
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
                        <h6>{{user.name}}</h6>
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
              <!-- BAGLOG -->
                <div class="backlog">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">Backlog</div>
                        <div id="tempat-card" class="isi-task">
                            <div class="issue" v-for="task in backlogTask" v-bind:key="task.id">
                                <div class="card-body">
                                  <h5 class="card-title">{{task.title}}</h5>
                                  <p class="card-text">{{task.description}}</p>
                                  <div class= "event-issue">
                                    <a v-on:click="showFormEdit(task.id)" style="cursor: pointer">Edit</a>
                                    <a v-on:click="deleteTask(task.id)" style="cursor: pointer"><i class="fas fa-trash-alt"></i></a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PRODUCT -->
                <div class="product">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">Product</div>
                        <div id="tempat-card" class="isi-task">
                            <div class="issue" v-for="task in productTask" v-bind:key="task.id">
                                <div class="card-body">
                                  <h5 class="card-title">{{task.title}}</h5>
                                  <p class="card-text">{{task.description}}</p>
                                  <div class= "event-issue">
                                    <a v-on:click="showFormEdit(task.id)" style="cursor: pointer">Edit</a>
                                    <a v-on:click="deleteTask(task.id)" style="cursor: pointer"><i class="fas fa-trash-alt"></i></a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  
                <!-- DEVELOPMENT -->
                <div class="development">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">Development</div>
                        <div id="tempat-card" class="isi-task">
                            <div class="issue" v-for="task in developmentTask" v-bind:key="task.id">
                                <div class="card-body">
                                  <h5 class="card-title">{{task.title}}</h5>
                                  <p class="card-text">{{task.description}}</p>
                                  <div class= "event-issue">
                                    <a v-on:click="showFormEdit(task.id)" style="cursor: pointer">Edit</a>
                                    <a v-on:click="deleteTask(task.id)" style="cursor: pointer"><i class="fas fa-trash-alt"></i></a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  
                <!-- DONE -->
                <div class="done">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-header">Done</div>
                        <div id="tempat-card" class="isi-task">
                            <div class="issue" v-for="task in doneTask" v-bind:key="task.id">
                                <div class="card-body">
                                  <h5 class="card-title">{{task.title}}</h5>
                                  <p class="card-text">{{task.description}}</p>
                                  <div class= "event-issue">
                                    <a v-on:click="showFormEdit(task.id)" style="cursor: pointer">Edit</a>
                                    <a v-on:click="deleteTask(task.id)" style="cursor: pointer"><i class="fas fa-trash-alt"></i></a>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  
            </div>
          </div>
        </div>
        <div id="add-task" v-else-if="currentPage === 'addTaskPage'">
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
        <div id="update-todo" v-else-if="currentPage === 'updateTaskPage'">
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
    </div>
</template>

<script>
export default {
    data() {
    return {
      message: 'Hello Vue!',
      register : {
        name : "",
        email : "",
        password : "",
      },
      login : {
        email : "",
        password : ""
      },
      currentPage: 'registerPage',
      tasks: [],
      user : {},
      currentTask: {},
      newTask : {
          title : "",
          description : ""
      },
      dataTask : {},
      categories : []
    };
  },
  computed: {
        backlogTask () {
            let output = []
            this.tasks.forEach(task => {
                if (task.CategoryId === 1) {
                    output.push(task)
                }
            })
            return output
            // return this.doneTask.filter()
        },
        productTask () {
            let output = []
            this.tasks.forEach(task => {
                if (task.CategoryId === 2) {
                    output.push(task)
                }
            })
            return output 
        },
        developmentTask () {
            let output = []
            this.tasks.forEach(task => {
                if (task.CategoryId === 3) {
                    output.push(task)
                }
            })
            return output 
        },
        doneTask () {
            let output = []
            this.tasks.forEach(task => {
                if (task.CategoryId === 4) {
                    output.push(task)
                }
            })
            return output 
        }
    },
    methods : {
        createUser() {
            axios({
                method : "POST",
                url : "http://localhost:3000/register",
                data : {
                    name : this.register.name,
                    email : this.register.email,
                    password : this.register.password
                }
            })
                .then(user => {
                    this.currentPage = 'loginPage'
                })
                .catch(response => {
                    console.log(response.data)
                })  
        },
        loginUser() {
            axios({
                method : "POST",
                url : "http://localhost:3000/login",
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
                .then(({data}) => {
                    localStorage.setItem('token', data.access_token)
                    this.fetch()
                    this.currentPage = "mainHomePage"
                    
                })
                .catch(response => {
                    console.log(response.data)
                })
        },
        fetch() {
            axios({
                method : "GET",
                url : "http://localhost:3000/tasks",
                headers : {
                    token: localStorage.getItem('token')
                }
            })
                .then(response => {
                    this.tasks = response.data.data
                    this.user = response.data.user
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        checkToken () {
            if(localStorage.getItem('token')) {
                this.currentPage = 'mainHomePage'
                this.fetch()
            } else {
                this.currentPage = 'loginPage'
            }
        },
        showFormAdd () {
            this.currentPage = 'addTaskPage'
        },
        addNewTask() {
            axios({
                method : "POST",
                url : "http://localhost:3000/tasks",
                data : {
                    title : this.newTask.title,
                    description : this.newTask.description
                },
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => { 
                    this.fetch()
                    this.currentPage = 'mainHomePage'
                })
                .catch(response => {
                    console.log(response.data)
                })
        },
        showFormEdit(id) {
            this.currentPage = 'updateTaskPage'
            axios({
                method : "GET",
                url : `http://localhost:3000/tasks/` + id,
                headers : {
                    token : localStorage.token
                }
            })
                .then(response => {
                    console.log('MASUK THEN AXIOS FIND BY PK')
                    this.dataTask = response.data.dataTask
                    this.categories = response.data.dataCategories
                })
                .catch(response => {
                    console.log(response.data)
                })
            
        },
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
        },
        deleteTask(id) {
            axios({
                method : "DELETE",
                url : `http://localhost:3000/tasks/` + id,
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
    created() {
        this.checkToken()
    }
}
</script>

<style>

</style>