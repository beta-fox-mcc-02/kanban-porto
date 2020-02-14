<template>
        <div class="row" id="login" >
            <div class="col s12 14 offset-14">
                <div class="card">
                    <div class="card-action">
                        Register
                    </div>
                    <div class="card-content">
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="emailregister" >
                        </div><br>
                        <div class="form-field">
                            <label for="password">password</label>
                            <input type="password" id="password" v-model="passwordregister" >
                        </div><br>
                        <div class="button">
                            <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click.prevent="ButtonRegist">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data : () => {
        return {
            currentPage : "",
            emailregister:"",
            passwordregister :"",
        }
    },
    methods : {
         ButtonRegist (){
            let password = this.passwordregister
            let email = this.emailregister
            // console.log(email)
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data: {
                  email: email,
                  password: password
                }
            })
                .then(data => {
                    console.log(data.data)
                    this.currentPage = 'login'
                    this.$emit('regiseter',this.currentPage)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
    }
}
</script>

<style>

</style>