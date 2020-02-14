new Vue({
    el: "#app",
    data: {
        statusUser: "notLogin",
        dataRegistration: {
            firstNameRegistration: "",
            lastNameRegistration: "",
            necessary: "",
            emailRegistration: "",
            passwordRegistration: ""
        },
        dataLogin: {
            emailLogin: "",
            passwordLogin: ""
        }
    },
    methods: {
        registration(){
            let newUser = {
                first_name : this.dataRegistration.firstNameRegistration ,
                last_name : this.dataRegistration.lastNameRegistration ,
                necessary: this.dataRegistration.necessary,
                email: this.dataRegistration.emailRegistration,
                password: this.dataRegistration.passwordRegistration
            }
            axios({
                url: 'http://localhost:3000/register',
                method: 'post',
                data : newUser
            })
                .then(user => {
                    this.statusUser = "notLogin"
                })
                .catch( err => {
                    console.log(err)
                })
        },
        login(){
            let loginUser = {
                email: this.dataLogin.emailLogin,
                password: this.dataLogin.passwordLogin
            }
            axios({
                url: 'http://localhost:3000/login',
                method: 'post',
                data : loginUser
            })
                .then(user => {
                    console.log(user.data)
                    localStorage.setItem("access_token", user.data.access_token)
                    this.statusUser = "user"

                })
                .catch( err => {
                    console.log(err)
                })            
        },
        showRegistrationForm(){
            this.statusUser = "notUser"
        },
        logout(){
            this.statusUser = "notLogin"
            localStorage.clear()
        }
    }

})