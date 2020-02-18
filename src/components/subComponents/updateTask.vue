<template>
    <div>
        <a class="btn text-right"  data-toggle="modal" :data-target="'#edit'+id"><i class="fas fa-edit"></i></a>
        <div class="modal fade" :id="'edit'+id" tabindex="-1" role="dialog" aria-hidden="true">
             <div class="modal-dialog" role="document">
                 <div class="modal-content" style="width: 50%;">
                    <div class="card card-signup z-depth-0 text-center">
                        <div class="card-body">
                            <form @submit.prevent="edit">
                            <div class="form-group">
                                <label for="name">Title</label>
                                <input type="text" v-model="taskName" name="taskTitle" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="name">Description</label>
                                <input type="text" v-model="taskDescription" name="taskdescription" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary text-light">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            taskTitle : this.taskName,
            taskdescription : this.taskDescription
        }
    },
    props : {
        taskName :  String,
        taskDescription : String,
        id : Number
    },
    methods : {
        edit(){
            console.log(this.taskName)
            // this.taskTitle = taskTitle
            // this.taskdescription = taskdescription
            axios.put(`https://quiet-depths-10928.herokuapp.com/tasks/${this.id}`, {
                title : this.taskName,
                description : this.taskDescription
            }, {
                headers : {
                token : localStorage.token,
                id : localStorage.id
                }
            })
            .then(({data}) => {
                this.$emit('readTask')
                this.$emit('readCategory')
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