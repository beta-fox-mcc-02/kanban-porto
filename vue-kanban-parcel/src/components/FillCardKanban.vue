<template>
  <div>
        <li>
            <div class="card-body">
                <span style="font-size: 3em; color: Tomato;">
                    <i class="fas fa-camera"></i>
                </span>
                <h4 class="card-title">{{task.title}}</h4>
                <p class="card-text">{{task.description}}</p>

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

                <br>

                <button 
                    type="button" 
                    class="btn btn-primary btn-sm" 
                    v-if="title.previous !== ''"
                    @click="previousCategoryId"
                >{{title.previous}}</button>

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
                url: `http://localhost:3000/tasks/${this.task.id}`,
                method: `delete`,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(deleted => {
                    this.$emit('fetch')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        edit(){
            this.$emit('showEdit', this.task)
        },
        previousCategoryId(){
            let changePreviousId = this.task.CategoryId - 1
            console.log(changePreviousId)
            axios({
                url: `http://localhost:3000/tasks/${this.task.id}`,
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
                    console.log(err)
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
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>