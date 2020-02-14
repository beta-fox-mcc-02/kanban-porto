<template>
  <div class="register" v-if="currentPage == 'register'">
        <div>
            <h1>REGISTER</h1>
        </div>
        <form class="form-register" method="POST" @submit.prevent="register">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                <input class="input" type="username" placeholder="Username" v-model="username">
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
                </p>
            </div>
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
                    Register
                </button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'register',
    props:{
        currentPage:String
    },
    data() {
        return {
            username:'',
            email:'',
            password:''
        }
    },
    methods:{
        register(){
            const username = this.username
            const email = this.email
            const password = this.password
            
            // axios({
            //     method: 'POST',
            //     url: 'http://localhost:3000/register',
            //     data:{
            //         username, email, password
            //     }
            // })
            //     .then(data=>{
            //         console.log(data, 'data register vue')
            //         this.changePage('login')
            //     })
            //     .catch(err=>{
            //         console.log(err,'error register vue')
            //     })
        },
        changePage(page){
            // console.log(page)
            this.$emit('changePage', page)
        }
    }
}
</script>

<style>

</style>