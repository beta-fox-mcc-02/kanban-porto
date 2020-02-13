<template>
    <div class="container">
        <div id="form-add">
            <h1 style="font-family: 'Lemonada', cursive;">ADD TASK</h1>
            <form  v-on:submit.prevent="regis">
                <label>FIRST NAME</label>
                <input id="first-name-regis" type="text" required v-model="task">
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>