<template>
  <div class="login" v-if="currentPage === 'login'">
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
    props:{
        currentPage:String
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
                url:"http://localhost:3000/login",
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
        }
    }
}
</script>

<style>

</style>