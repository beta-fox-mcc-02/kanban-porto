<template>
    <div class="container" id="add-task">
        <div id="form-add">
            <h1 style="font-family: 'Lemonada', cursive;">EDIT TASK</h1>
            <form  v-on:submit.prevent="edit">
                <label>YOUR TASK</label>
                <textarea id="first-name-regis" style="min-height: 100px; max-width: 600px; resize: none" required v-model="dataTitle"></textarea>
                <button type="submit" class="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "EditForm",
    props: {
        id: Number,
        title: String,
        CategoryId: Number,
        UserId: Number
    },
    data() {
        return {
            dataTitle: this.title
        }
    }, 
    methods: {
        edit() {
            axios({
                method: "put",
                url: `http://localhost:3000/tasks/${this.id}`,
                data: {
                    CategoryId: this.CategoryId,
                    title: this.dataTitle
                },
                headers: {
                    token: localStorage.token
                }

            })
                .then(data => {
                    this.notifSuccess('sucess edit task')
                    this.changePage('landing')
                })
                .catch(err => {
                    this.notifFailed(err.responseJSON.msg[0])
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
    created () {
        console.log(this.id)
    }
}
</script>

<style>

</style>