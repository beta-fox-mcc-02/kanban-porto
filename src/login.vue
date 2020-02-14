<template>
  <div class="login" >
        <div>
            <h1>LOGIN</h1>
        </div>
        <form class="form-login" method="POST" @submit.prevent="login">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="email">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                <button type="submit" class="button is-success">
                    Login
                </button>
                </p>
            </div>
        </form>
            <a @click="gSignIn"><i class="fab fa-google"></i> Google SignIn</a>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return {
            email:'',
            password:''
        }
    },
    methods:{
        changePage(page){
            console.log(page,'change page login');
            this.$emit('changePage',page)
        },
        login(){
            const email = this.email
            const password = this.password
            
            axios({
                method:"POST",
                url:"https://secure-retreat-20188.herokuapp.com/login",
                data:{
                    email, password
                }
            })
                .then(({data})=>{
                    localStorage.setItem('token',data.token)
                    this.changePage('home')
                })
                .catch(err=>{
                    console.log(err,'error login vue')
                })
        },
        gSignIn(){
            this.$gAuth.signIn()
                .then(authCode => {
                    const token = authCode.getAuthResponse().id_token
                    axios({
                        method:"POST",
                        url:"https://secure-retreat-20188.herokuapp.com/gsignin",
                        headers:{
                            token
                        }
                    })
                    .then(({data})=>{
                        localStorage.setItem('token',data.token)
                        this.changePage('home')
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