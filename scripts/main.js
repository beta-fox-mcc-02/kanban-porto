new Vue({
    el: '#app',
    data: {
        isLogedIn: false,
        toSignIn: false,
        toSignUp: false,
        board: false,
        addCard: false,
        editCard: false,
        title: '',
        description: '',
        category: '',
        tasks: []
    },
    methods: {
        addCardForm: function() {
            this.addCard = true
            this.editCard = false
        },
        editCardForm: function() {
            this.editCard = true
            this.addCard = false
        },
        signInForm: function() {
            this.toSignIn = true
            this.toSignUp = false
        },
        signUpForm: function() {
            this.toSignIn = false
            this.toSignUp = true
        },
        signIn: function() {
            localStorage.setItem('token', 'token')
            this.fetchTask()
            this.board = true
            this.toSignIn = false
            this.toSignUp = false
            this.isLogedIn = true
        },
        signOut: function() {
            localStorage.removeItem('token')
            this.toSignIn = true
            this.board = false
            this.isLogedIn = false
        },
        fetchTask: function() {
            axios.get('http://localhost:3000/task')
                .then(response => {
                    response.data.forEach(task => {
                        this.tasks.push(task)
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addCardFunction: function(category) {
            console.log(this.title)
            console.log(this.description)
            console.log(category)
            // axios.post({
            //     method: 'POST',
            //     url: 'http://localhost:3000/task',
            //     data: {
            //         title: this.title,
            //         description: this.description,
            //         category: category
            //     }
            // })
            //     .then(response => {
            //         console.log(response)
            //         this.editCard = false
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.fetchTask()
            this.board = true
            this.isLogedIn = true
        } else {
            this.toSignIn = true
            this.isLogedIn = false
        }
    }
})