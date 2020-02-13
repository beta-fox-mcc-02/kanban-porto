<template>
    <div class = 'plan'>
        <div class="title" :style="getColor">
            <i :class="box.icon"></i> {{box.name}}
        </div>
        <kanbanContent
        v-for="(category, i) in getCategory" 
        :key="i"
        :list="category"
        :task="getCategory"
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