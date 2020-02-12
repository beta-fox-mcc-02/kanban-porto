new Vue ({
    el: '#kanban',
    data: {
        currentPage: 'register',
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    },
    methods: {
        regis() {
            this.currentPage = 'login'
        },
        login() {
            this.currentPage = 'landing'
        }
    }
})