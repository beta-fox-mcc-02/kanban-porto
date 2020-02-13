<template>
    <div>
        <i :class="next.icon" :id="next.name"></i>
    </div>
</template>

<script>
export default {
    name: "NextBack",
    props: {
        next:Object
    },
    data () {
        return {

        }
    },
    
}
</script>

<style>

</style>