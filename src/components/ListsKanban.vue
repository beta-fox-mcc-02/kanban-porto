<template>
    <div>
        <br>
        <CardKanban
            v-for="(title, i) in titles"
            :key="i"
            :title="title"
            :tasks="tasks"
            @home="home"
            @fetch="fetch"
            @showEdit="showEdit"
            class="list"
        ></CardKanban>
    </div>
</template>

<script>

import CardKanban from './CardKanban'
import axios from '../config/index'

export default {
    name: "ListsKanban",
    data() {
        return {
            tasks: [],
            titles: [{
                name: "BACKLOG", 
                previous: "",
                next: "TODO"
            },
            {
                name: "TODO", 
                previous: "BACKLOG",
                next: "DOING"

            },
            {
                name: "DOING", 
                previous: "TODO",
                next: "DONE"
            }, 
            {
                name: "DONE", 
                previous: "DOING",
                next: ""
            }]
        }
    },
    components: {
        CardKanban
    },
    methods: {
        fetchData(){
            let token = localStorage.getItem('access_token')
            axios({
                url: '/tasks',
                method: 'get',
                headers: {
                    access_token : token
                }
            })
                .then(tasksById => {
                    this.tasks = tasksById.data.data
                })
                .catch(err => {
                    this.$emit('error', 'fetch data: ERROR!')
                })
        },
        home(){
            this.$emit('home')
        },
        fetch(){
            this.fetchData()
        }, 
        showEdit(editData){
            this.$emit('showEdit', editData)
        }

    },
    created() {
        if(localStorage.access_token) {
            this.fetchData()
        }
    }
    
}
</script>

<style>

</style>