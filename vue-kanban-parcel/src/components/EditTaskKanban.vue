<template>
    <div>
        <form 
            id="editTask" 
            class="form" 
            @submit.prevent="edit"
        >
            <h3>EDIT TASK</h3>
            <div class="form-group">
                <label>Title</label><br>
                <input type="text" class="form-control"  v-model="editTask.title">
            </div>
            <div class="form-group">
                <label>Description</label><br>
                <input type="text" class="form-control" v-model="editTask.description">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "EditKanban",
    data(){
        return {
            editTask : {
                title: this.editData.title,
                description: this.editData.description
            }
        }
    },
    props: {
        editData : Object
    },
    methods: {
        edit() {
            let editTaskInput = {
                title : this.editTask.title,
                description : this.editTask.description
            }
            axios({
                url: `http://localhost:3000/tasks/${this.editData.id}`,
                method: `put`,
                data: editTaskInput,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(editedUser => {
                    this.$emit('home')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

}
</script>

<style>

</style>