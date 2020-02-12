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
        cards: [],
        currentPage: 'landing',
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
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    this.currentPage = 'landing'
                    this.fetchTask()
                    console.log(data.token)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTask() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/tasks',
                headers: {
                    token: localStorage.token
                }
            })
                .then(({data}) => {
                    this.cards = data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        hapus(id) {
            console.log(id)
        }
    },
    created() {
        if (localStorage.token) {
            this.fetchTask()
            this.currentPage = 'landing'
        }
    },
    computed: {
        dataPlan() {
            if(this.cards.tasks) {
                const data = []
                for (let i in this.cards.tasks) {
                    if (this.cards.tasks[i].CategoryId === 1) {
                        data.push(this.cards.tasks[i])
                    }
                }
                return data
            }
        },
        dataDo() {
            if(this.cards.tasks) {
                const data = []
                for (let i in this.cards.tasks) {
                    if (this.cards.tasks[i].CategoryId === 2) {
                        data.push(this.cards.tasks[i])
                    }
                }
                return data
            }
        },
        dataActual() {
            if(this.cards.tasks) {
                const data = []
                for (let i in this.cards.tasks) {
                    if (this.cards.tasks[i].CategoryId === 3) {
                        data.push(this.cards.tasks[i])
                    }
                }
                return data
            }
        },
        dataDone() {
            if(this.cards.tasks) {
                const data = []
                for (let i in this.cards.tasks) {
                    if (this.cards.tasks[i].CategoryId === 4) {
                        data.push(this.cards.tasks[i])
                    }
                }
                return data
            }
        }
    }
})