new Vue({
    el: "#app",
    data: {
        currentPage: 'register',
        categories: [],
        name: '',
        email: '',
        password: '',
        errorMessage: '',
        taskTitle: '',
        taskTag: '',
        unfilledInput: false,
    },
    methods: {
        emptyInputs() {
            this.name = ''
            this.email = ''
            this.password = ''
            this.taskTitle = ''
            this.taskTag = ''
        },
        register() {
            if(this.email && this.password) {
                axios({
                    method: "POST",
                    url: "http://localhost:3000/user/register",
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                })
                .then((result) => {
                    this.currentPage = 'login'
                    console.log(result.data)
                })
                .catch((err) => {
                    this.errorMessage = `You have been registered, please login instead`
                    console.log(err)
                })
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
            this.emptyInputs()
        },
        redirect() {
            if (this.currentPage === 'register') this.currentPage = 'login'
            else this.currentPage = 'register'
            this.emptyInputs()
            this.errorMessage = ''
        },
        login(){
            if(this.email && this.password) {
                axios({
                    method: "POST",
                    url: "http://localhost:3000/user/login",
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then((result) => {
                    this.currentPage = 'member'
                    localStorage.setItem('access_token', result.data.token)
                    this.fetchAll()
                    console.log(`LOGIN SUCCESS`)
                })
                .catch((err) => {
                    this.errorMessage = `You have not registered yet, please register first`
                    console.log(err)
                })
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
            this.emptyInputs()
        },
        logout() {
            localStorage.clear()
            this.currentPage = 'register'
        },
        fetchAll() {
            axios({
                method: "GET",
                url: "http://localhost:3000/task/findAll"
            })
            .then((result) => this.categories = result.data)
            .catch((err) => console.log(err))
        },
        showFormAdd() { this.currentPage = 'newtask' },
        addTask() {
            if(this.taskTitle && this.taskTag) {
                let token  = localStorage.getItem('access_token')
                axios({
                    method: "POST",
                    url: "http://localhost:3000/task/create",
                    headers: { token },
                    data: {
                        token,
                        title: this.taskTitle,
                        tag: this.taskTag
                    }
                })
                .then((result) => {
                    this.emptyInputs()
                    this.currentPage = 'member'
                    this.fetchAll()
                    console.log(result)
                })
                .catch((err) => {
                    this.errorMessage = `Title length is inapproriate (maximum 200 letter)`
                    console.log(err)
                })
            }
            else {
                this.unfilledInput = true
                this.errorMessage = `Please fill in required inputs`
            }
        },
        editTask(){
            console.log(this.taskTitle, this.taskTag)
        },
        deleteTask(taskId) {
            axios({
                method: "DELETE",
                url: `http://localhost:3000/task/delete/${taskId}`
            })
            .then(() => this.fetchAll())
            .catch((err) => console.log(err))
        }
    },
    created() {
        let access_token = localStorage.getItem('access_token')
        if(access_token) {
            this.currentPage = 'member'
            this.fetchAll()
        }
    }
})