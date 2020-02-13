<template>
    <div>
        <div class="content-card" v-for="task in category" v-bind:key="task.id" v-bind:task="task">
            <MainCardsChild></MainCardsChild>
            {{ task }}
        </div>
    </div>
</template>

<script>
import MainCardsChild from './3rdTierComponents/mainCardsChild.vue'

export default {
    name: 'MainCards',
    props: {
        category: Object
    },
    components: { MainCardsChild }
}
</script>

<style>

</style>