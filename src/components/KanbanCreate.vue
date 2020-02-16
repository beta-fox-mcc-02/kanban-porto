<template>
    <div class="login">
        <h1>Create Task Form</h1> <br>
        <form @submit.prevent="createTask">
            <label>Title</label>
            <input v-model="title" type="text" name="" class="form_create" >

            <input type="submit" id="save-button" class="btn_login" value="Save"><br>
        </form>		
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "KanbanAdd",
    // props: {
    //     title: String
    // },
    data() {
        return {
            title: ""
        };
    },
    methods: {
        createTask() {
            console.log('Create', this.title, localStorage.token);
            
            axios({
                method: "post",
                url: "http://localhost:3000/board/",
                headers: {
                    "token" : localStorage.token
                },
                data: {
                    title : this.title
                }
            })
                .then(result => {
                    console.log(result);
                    
                    this.$emit("showContent", "Home")
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        }
    }
}
</script>

<style>
</style>