new Vue({
    el: '#app',
    data: {
        isLogedIn: false,
        toSignIn: false,
        toSignUp: false,
        board: false,
        addCard: false,
        editCard: false,
        gToken: '',
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
            // this.fetchTask()
            this.board = true
            this.toSignIn = false
            this.toSignUp = false
            this.isLogedIn = true
        },
        onSignIn: function(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            this.gToken = id_token
            localStorage.setItem('gToken', this.gToken)
            localStorage.setItem('token', 'token')
            console.log(gToken)

            // this.fetchTask()
            this.board = true
            this.toSignIn = false
            this.toSignUp = false
            this.isLogedIn = true
        },
        signOut: function() {
            localStorage.removeItem('token')

            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });

            this.toSignIn = true
            this.board = false
            this.isLogedIn = false
        },
        // fetchTask: function() {
        //     axios.get('http://localhost:3000/task')
        //         .then(response => {
        //             response.data.forEach(task => {
        //                 this.tasks.push(task)
        //             });
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },         
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
            // this.fetchTask()
            this.board = true
            this.isLogedIn = true
        } else {
            this.toSignIn = true
            this.isLogedIn = false
        }
    }
})