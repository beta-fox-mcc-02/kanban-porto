<template>
  <div class="card mb-2">
        <div class="card-body">
            <p class="card-text">{{ task.title }}</p>

            <div class="btn-group btn-group-justified" role="group" aria-label="Justified button group">
                <a href="#" @click.prevent="editTask" class="btn btn-success"><i class="fa fa-edit"></i></a>
                <a href="#" @click.prevent="deleteTask(task.id)" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                <a href="#" @click.prevent="forwardTask" class="btn btn-warning"><i class="fa fa-forward"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'TaskCard',
    props: {
        task: Object
    },
    methods: {
        editTask() {
            this.$emit('editTask', this.task.id);
        },
        createTask() {
            this.$emit('createTask', this.task.title);
        },
        deleteTask(id) {
            axios({
                method: "delete",
                url: "http://localhost:3000/board/" + id,
                headers: {
                    "token": localStorage.token
                }
            })
                .then(success => {
                    this.$emit('deletedData');
                })
                .catch(err => {
                    console.log(err);
                    
                    this.$emit("error-message",
                    "Email or password dismatch");
                })
        },
        forwardTask() {
            this.$emit('forwardTask', this.task.id, this.task.CategoryId);
        }
    }
}
</script>

<style>

</style>