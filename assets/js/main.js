new Vue({
    el: ".body",
    data: {
        currentPage: 'home',
        form_register: {
            username: '',
            email: '',
            password: ''
        },
        form_login: {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            const { username, email, password } = this.form_register
            console.log(username, email, password, 'masuk di register pak')
            axios({
                method: "POST",
                url: "http://localhost:3000/register",
                data: {
                    username, email, password
                }
            })
                .then(data => {
                    console.log(data, 'data client')
                })
                .catch(err => {
                    console.log(err, 'error axios register')
                })
        },
        login() {
            const { email, password } = this.form_login
            console.log(email, password);
            axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: {
                    email, password
                }
            })
                .then(data => {
                    console.log(data, 'data client')
                })
                .catch(err => {
                    console.log(err, 'error axios login')
                })
        },
        card(){
            
        }
    }
})