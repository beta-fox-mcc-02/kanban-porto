var app = new Vue({
    el: '#app',
    data: {
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
})
  