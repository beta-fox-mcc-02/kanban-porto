<template>
    <div class="home">
        <kanbanCard
        v-for="(box, i) in boxes" 
        :key="i" 
        :box="box"
        :tasks="tasks"
        @changePage="changePage"
        @fetch="fetchTask"
        ></kanbanCard>
    </div>
</template>

<script>
import kanbanCard from './kanbanCard'
import axios from 'axios'

export default {
    name: 'home',
    data () {
        return {
            tasks: [],
            boxes: [{
                name: 'Plan',
                color: 'red', 
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Do',
                color: 'yellow',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Actual',
                color: 'greenyellow',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Done',
                color: 'blue',
                icon: "fab fa-telegram-plane"
            }]
        }
    },
    methods: {
        fetchTask() {
            axios({
                method: "get",
                url: "http://localhost:3000/tasks",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({data}) => {
                    this.tasks = data.tasks
                })
                .catch(err => {
                    console.log(err)
                })
        },
        changePage(page) {
            console.log('KAKENYA KE TRIGGER', page)
            this.$emit('changePage', page)
        },
    },
    components: {
        kanbanCard
    },
    created() {
        if (localStorage.token) {
            this.fetchTask()
        }
    }
}
</script>

<style>

</style>