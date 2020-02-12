new Vue ({
    el: '#kanban',
    data: {
        register: {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        },
        valLogin: {
            email: "",
            password: ""
        },
        currentPage: 'register',
    },
    methods: {
        regis() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data: {
                    first_name: this.register.first_name,
                    last_name: this.register.last_name,
                    email: this.register.email,
                    password: this.register.password
                }
            })
                .then((response) => {
                    this.currentPage = 'login'
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })

        },
        login() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.valLogin.email,
                    password: this.valLogin.password
                }
            })
                .then((data) => {
                    this.currentPage = 'landing'
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTask() {

        }
    },
    created() {
        
    }
})