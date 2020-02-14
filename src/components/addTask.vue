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
import axios from 'axios'

export default {
    name: "adaTask",
    data () {
        return {
            taskData: ''
        }
    }, 
    methods: {
        task() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/tasks',
                data: {
                    // title: this.taskData,
                    title: this.taskData,
                    category: 1
                }, 
                headers: {
                    token: localStorage.token
                }
            })
                .then(data => {
                    this.notifSuccess('sucess add task')
                    this.changePage('landing')
                })
                .catch(err => {
                    this.notifFailed(err.responseJSON.msg[0])
                    // console.log(err)
                })
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        },
        notifFailed(msg) {
            this.$emit('notifFailed', msg)
        }
    },
}
</script>

<style>

</style>