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
        // category: {
        //     plan: [],
        //     do: [],
        //     actual: [],
        //     done: []
        // },
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
                    // for (let i in data.tasks) {
                    //     if (data.tasks[i].CategoryId === 1) {
                    //         this.category.plan.push(data.tasks[i])
                    //     } else if (data.tasks[i].CategoryId === 2) {
                    //         this.category.do.push(data.tasks[i])
                    //     } else if (data.tasks[i].CategoryId === 3) {
                    //         this.category.actual.push(data.tasks[i])
                    //     } else if (data.tasks[i].CategoryId === 3) {
                    //         this.category.done.push(data.tasks[i])
                    //     }
                    // }
                    this.cards = data
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        if (localStorage.token) {
            this.fetchTask()
            this.currentPage = 'landing'
        }
    },
    computed: {
        ganang() {
            if(this.cards.tasks) {
                return this.cards.tasks[0]

            }
            // console.log(this.cards.tasks)
        }
    }
})