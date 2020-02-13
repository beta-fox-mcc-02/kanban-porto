<template>
    <main>
        <section class="content-box" v-for="category in categories" v-bind:key="category.id">
            <div class="content-header">
                <h3> {{ category.name }} </h3>
            </div>
            <div class="content-container">
                <MainCards  v-bind:category="category" v-on:changePage="changePage"></MainCards>
            </div>
        </section>
    </main>
</template>

<script>
import MainCards from './2ndTierComponents/maincards.vue'

export default {
    name: 'Main',
    props: {
        categories: Array
    },
    components: { MainCards },
    methods: {
        changePage(fromChild) {
            this.$emit('changePage', { page: fromChild.page })
        }
    }
}
</script>

<style>

</style>