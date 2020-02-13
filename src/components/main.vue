<template>
    <main>
        <section class="content-box" v-for="category in categories" v-bind:key="category.id" v-bind:category="category">
            <div class="content-header">
                <h3> {{ category.name }} </h3>
                {{category.id}}
            </div>
            <div class="content-container">
                <MainCards></MainCards>
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
    components: { MainCards }
}
</script>

<style>

</style>