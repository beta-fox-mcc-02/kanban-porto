<template>
    <div class="container">
        <div id="form-login">
            <h1 style="font-family: 'Lemonada', cursive;">LOG IN</h1>
            <form v-on:submit.prevent="login">
                <label>EMAIL</label>
                <input type="email" required v-model="email">
                <label>PASSWORD</label>
                <input type="password" required v-model="password">
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: ''
        }
    }
}
</script>

<style>

</style>