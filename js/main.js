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
      currentPage: 'login',
      tasks: [],
      user : {}
    },
    computed: {
        doneTask () {
            let output = []
            //
            return this.doneTask.filter()
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
        addNewTask () {
            this.currentPage = 'addTaskPage'
        }
    },
    created() {
        this.checkToken()
    }
})
  