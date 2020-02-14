<template>
    <div class="container" id="add-task">
        <div id="form-add">
            <h1 style="font-family: 'Lemonada', cursive;">ADD TASK</h1>
            <form  v-on:submit.prevent="task">
                <label>YOUR TASK</label>
                <textarea id="first-name-regis" style="min-height: 100px; max-width: 600px; resize: none" required v-model="taskData"></textarea>
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditForm",
    data() {
        return {

        }
    }
}
</script>

<style>

</style>