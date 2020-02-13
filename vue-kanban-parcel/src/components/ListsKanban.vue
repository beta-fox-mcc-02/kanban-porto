<template>
    <div>
        <CardKanban
            v-for="(title, i) in titles"
            :key="i"
            :title="title"
            :tasks="tasks"
            class="list"
        ></CardKanban>
    </div>
</template>

<script>

import CardKanban from './CardKanban'
import axios from 'axios'

export default {
    name: "ListsKanban",
    data() {
        return {
            tasks: [],
            titles: [{
                name: "backlog"
            },
            {
                name: "todo"
            },
            {
                name: "doing"
            }, 
            {
                name: "done"
            }]
        }
    },
    components: {
        CardKanban
    },
    methods: {
        fetchData(){
            console.log(`masuk login`)
            let token = localStorage.getItem('access_token')
            axios({
                url: 'http://localhost:3000/tasks',
                method: 'get',
                headers: {
                    access_token : token
                }
            })
                .then(tasksById => {
                    // console.log( tasksById.data.data, `masuk boy~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
                    this.tasks = tasksById.data.data
                })
                .catch(err => {
                    console.log(err)
                })
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