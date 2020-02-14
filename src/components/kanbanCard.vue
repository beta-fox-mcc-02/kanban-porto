<template>
    <div class = 'kanban-card'>
        <div class="title" :style="getColor">
            <i :class="box.icon"></i> {{box.name}}
        </div>
        <kanbanContent
        v-for="(category, i) in getCategory" 
        :key="i"
        :list="category"
        :task="getCategory"
        @notifSuccess="notifSuccess"
        @notifFailed="notifFailed"
        @changePage="changePage"
        @fetch="fetch"
        @formEdit="formEdit"
        ></kanbanContent>
    </div>
</template>


<script>
import kanbanContent from './kanbanContent'

export default {
    name: 'kanbanCard',
    props: {
        box:Object,
        tasks: Array
    },
    data () {
        return {
            
        }
    },
    components: {
        kanbanContent
    },
    methods: {
        changePage(page) {           
            this.$emit('changePage', page)
        },
        fetch() {
            this.$emit('fetch')
        },
        formEdit(id, title, CategoryId, UserId)  {
            this.$emit('formEdit', id, title, CategoryId, UserId)
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        },
        notifFailed(msg) {
            this.$emit('notifFailed', msg)
        }
    },
    computed: {
        getColor () {
            return {
                "background-color": this.box.color
            }
        },
        getCategory () {
            let result = this.tasks.filter(i => i.Category.name === this.box.name)
            return result
        }
    }
}
</script>

<style>
</style>