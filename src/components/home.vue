<template>
    <div class="home">
        <kanbanCard
        v-for="(box, i) in boxes" 
        :key="i" 
        :box="box"
        :tasks="tasks"
        @notifSuccess="notifSuccess"
        @notifFailed="notifFailed"
        @changePage="changePage"
        @fetch="fetchTask"
        @formEdit="formEdit"
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
                color: '#f0cf85', 
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Do',
                color: '#e7f0c3',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Actual',
                color: '#a4d4ae',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Done',
                color: '#32afa9',
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
                    this.notifFailed('fetch failed')
                })
        },
        changePage(page) {
            console.log('KAKENYA KE TRIGGER', page)
            this.$emit('changePage', page)
        },
        formEdit(id, title, CategoryId, UserId) {
            console.log(title, CategoryId, UserId, "INIII DARIIIIIIIIIII USEEERRRRRRRR")
            this.$emit('formEdit', id, title, CategoryId, UserId)
        },
        notifFailed(msg) {
            this.$emit('notfifFailed', msg)
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        }
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