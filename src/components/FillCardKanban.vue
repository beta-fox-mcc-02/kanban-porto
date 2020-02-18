<template>
  <div>
        <li>
            <div class="card-body">
                <h4 class="card-title">{{task.title}}</h4>
                <p class="card-text">{{task.description}}</p>

                <button 
                    type="button" 
                    class="btn btn-primary btn-sm" 
                    v-if="title.previous !== ''"
                    @click="previousCategoryId"
                >{{title.previous}}</button>

                <a 
                    href="#" 
                    class="btn btn-primary" 
                    @click="edit"
                >EDIT</a>

                <a 
                    href="#" 
                    class="btn btn-danger" 
                    @click="remove"
                >DELETE</a>

                <button 
                    type="button" 
                    class="btn btn-secondary btn-sm"
                    v-if="title.next !== ''"
                    @click="nextCategoryId"
                >{{title.next}}</button>
            </div>
        </li>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "FillCardKanban",
    props: {
        task: Object,
        title: Object
    }, 
    methods: {
        remove(){
            axios({
                url: `/tasks/${this.task.id}`,
                method: `delete`,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(deleted => {
                    this.$emit('fetch')
                })
                .catch(err => {
                     this.$emit('error', 'Cannot remove this task')
                })
        },
        edit(){
            this.$emit('showEdit', this.task)
        },
        previousCategoryId(){
            let changePreviousId = this.task.CategoryId - 1
            console.log(changePreviousId)
            axios({
                url: `/tasks/${this.task.id}`,
                method: `put`,
                data: {
                    CategoryId : changePreviousId
                },
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(editedPreviousCategory => {
                    this.$emit('fetch')
                })
                .catch(err => {
                    this.$emit('error', 'cannot move to the previous category!')
                })
        },
        nextCategoryId(){
            let changeNextId = this.task.CategoryId + 1
            console.log(changeNextId)
            axios({
                url : `http://localhost:3000/tasks/${this.task.id}`,
                method: `put`,
                data: {
                    CategoryId : changeNextId
                },
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(editedNextCategory => {
                    this.$emit('fetch')
                })
                .catch(err => {
                    this.$emit('error', 'cannot move to the next category!')
                })
        }
    }
}
</script>

<style>

</style>