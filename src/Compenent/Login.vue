<template>
    <!-- <div class="login" v-if="currentPage === 'login'"> -->
        <div class="row" id="login" >
            <div class="col s12 14 offset-14">
                <div class="card">
                    <div class="card-action">
                        Login
                    </div>
                    <div class="card-content">
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="email">
                        </div><br>
                        <div class="form-field">
                            <label for="password">password</label>
                            <input type="password" id="password" v-model="password">
                        </div><br>
                        <div class="button">
                            <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click="ButtonLogin">Submit
                                <i class="material-icons right">send</i>
                            </button>
                            <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click="Buttonregister">Register
                                <i class="material-icons right">send</i>
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
            <a @click="gSignIn"><i class="fab fa-google"></i> Google SignIn</a>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    data : () =>{
        return {
            email:"",
            password :"",
        }
    },
    methods : {
        ButtonLogin(){
            let password = this.password
            let email = this.email
            axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                  email: email,
                  password: password
                },
                headers : {
                    token : localStorage.token
                }
              })
                .then(({data}) => {
                    localStorage.setItem("token",data)
                    this.$emit('keregister',"main")
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        Buttonregister(){
            this.$emit('keregister',"register")
        },
        gSignIn(){
            this.$gAuth.signIn()
                .then(authCode => {
                    const token = authCode.getAuthResponse().id_token
                    axios({
                        method:"POST",
                        url:"http://localhost:3000/logingoogle",
                        headers:{
                            token
                        }
                    })
                    .then(({data})=>{
                        localStorage.setItem('token',data.token )
                        this.$emit('keregister',"main")
                    })
                })
                .catch(err=>{
                    console.log(err,'error gsignin')
                })
        }
            
    }
}
</script>

<style>

</style>