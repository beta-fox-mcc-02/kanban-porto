<template>
    <div>
        <div class="content-card" v-for="task in category.Tasks" v-bind:key="task.id">
            <MainCardsChild v-bind:task="task" v-on:changePage="changePage"></MainCardsChild>
        </div>
    </div>
</template>

<script>
import MainCardsChild from './MainCardsChild.vue'

export default {
    name: 'MainCards',
    props: {
        category: Object
    },
    components: { MainCardsChild },
    methods: {
        changePage(fromChild) {
            this.$emit('changePage', { page: fromChild.page })
        }
    }
}
</script>

<style>

</style>