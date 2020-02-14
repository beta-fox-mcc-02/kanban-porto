<template>
    <div class="register-box">
        <h1>Register User Form</h1> <br>
        <form>
            <label>Username</label>
            <input type="text" name="" class="form_login" placeholder="Input your email..." v-model="username">

            <label>Password</label>
            <input type="text" name="password" class="form_login" placeholder="Input your password..." v-model="password">

            <input type="submit" id="register-button" class="btn_register" value="Register"><br>
        </form>		
    </div>
</template>

<script>
export default {
    name: "form-register",
    data() {
        return {
            username: "",
            password: ""
        }
    }
}
</script>

<style>

</style>