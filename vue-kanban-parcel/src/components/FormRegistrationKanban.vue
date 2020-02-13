<template>
    <div>
        <form id="formRegistration" class="form" @submit.prevent="registration">
            <h3>REGISTRATION</h3>
                <div class="form-group">
                    <label for="firstName">First Name</label><br>
                    <input type="text" class="form-control" id="firstName"  v-model="dataRegistration.firstNameRegistration">
                </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label><br>
                    <input type="text" class="form-control" id="lastName"  v-model="dataRegistration.lastNameRegistration">
                </div>
                    <div class="form-group">
                        <label for="necessary">Necessary</label><br>
                    <input type="text" class="form-control" id="necessary"  v-model="dataRegistration.necessary">
                </div>
                <div class="form-group">
                    <label for="emailRegistration" >Email address</label><br>
                    <input type="email" class="form-control" id="emailRegistration"  aria-describedby="emailHelp" v-model="dataRegistration.emailRegistration">
                </div>
                <div class="form-group">
                    <label for="passwordRegistration">Password</label><br>
                    <input type="password" class="form-control" id="passwordRegisTration" v-model="dataRegistration.passwordRegistration">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
        </form>        
    </div>
</template>

<script>

import axios from 'axios' 

export default {
    name: "FormRegistrationKanban",
    data () {
        return {
            dataRegistration : {
                firstNameRegistration: "",
                lastNameRegistration: "",
                necessary: "",
                emailRegistration: "",
                passwordRegistration: ""
            }
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
                    this.$emit('changePage', 'logout')
                })
                .catch( err => {
                    console.log(err)
                })

        }
    }
}
</script>

<style>

</style>