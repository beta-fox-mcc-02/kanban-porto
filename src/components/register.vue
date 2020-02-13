<template>
    <div class="container">
        <div id="form-regis">
            <h1 style="font-family: 'Lemonada', cursive;">REGISTER</h1>
            <form  v-on:submit.prevent="regis">
                <label>FIRST NAME</label>
                <input id="first-name-regis" type="text" required v-model="first_name">
                <label>LAST NAME</label>
                <input id="last-name-regis" type="text" required v-model="last_name">
                <label>EMAIL</label>
                <input id="email-regis" type="email" required v-model="email">
                <label>PASSWORD</label>
                <input id="password-regis" type="password" required v-model="password">
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }
}
</script>

<style>

</style>