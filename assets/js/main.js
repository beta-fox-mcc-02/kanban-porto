new Vue({
    el: ".body",
    data: {
        currentPage: 'login',
        cards:[],
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
            // console.log(email, password);
            axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: {
                    email, password
                }
            })
                .then(({ data }) => {
                    console.log(data, 'data client')
                    // localStorage.setItem('token', data.token)
                    this.currentPage = 'home'
                    this.fetchKanban()
                })
                .catch(err => {
                    console.log(err, 'error axios login')
                    this.currentPage = 'login'
                })
        },
        fetchKanban() {
            axios({
                method: "GET",
                url: "http://localhost:3000"
            })
                .then(({data}) => {
                    for(el of data.data){
                        this.cards.push(el)
                    }
                })
                .catch(err => {
                    console.log(err, 'error kanban')
                })
        }
    },
    computed:{
        backlog(){
            let cards = this.cards.filter(el => el.CategoryId == 1)
            return cards
        },
        todo(){
            let cards = this.cards.filter(el => el.CategoryId == 2)
            return cards
        },
        done(){
            let cards = this.cards.filter(el => el.CategoryId == 3)
            return cards
        },
        completed(){
            let cards = this.cards.filter(el => el.CategoryId == 4)
            return cards
        }
    }
})