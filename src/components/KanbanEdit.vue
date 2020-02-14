<template>
    <div class="login">
        <h1>Edit Task Form</h1> <br>
        <form @submit.prevent="updateTask">
            <label>Title</label>
            <input v-model="title" type="text" name="" class="form_login" >

            <input type="submit" id="login-button" class="btn_login" value="Save"><br>
        </form>		
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "KanbanEdit",
    props: {
        editId: Number
    },
    data() {
        return {
            title: ""
        };
    },
    methods: {
        getById(){
            axios({
                method: "get",
                url: "http://localhost:3000/board/" + this.editId,
                headers: {
                    "token" : localStorage.token
                }
            })
                .then(result => {
                    this.title = result.data.data.title;
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        updateTask() {
            axios({
                method: "patch",
                url: "http://localhost:3000/board/" + this.editId + '/change',
                headers: {
                    "token" : localStorage.token
                },
                data: {
                    title : this.title
                }
            })
                .then(result => {
                    // this.title = result.data.data.title;
                    console.log(result);
                    this.$emit("showContent", "Home")
                    
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        }
    },
    created() {
        this.getById();
    }
}
</script>

<style>
</style>