<template>
    <div class="card" id="card-title">
        <div class="card-content">
            <p> {{ list.title }} </p>
        </div>
        <div class="card-tabs" id="plan-card-title-center">
            <i class="fas fa-user"></i>
            <i class="fas fa-edit"></i>
            <a @click="destroy(list.id)"><i class="fas fa-trash-alt" ></i></a>
        </div>
        <div  class="card-content grey lighten-4" id="plan-card-title-bottom">
            <!-- {{ getStatus }} -->
            <NextBack
            v-for="(next, i) in getStatus"
            :key="i"
            :next="next"
            ></NextBack>
        </div>
    </div>
</template>

<script>
import NextBack from './nextBackContent'
import axios from 'axios'

export default {
    name: 'kanbanContent',
    props: {
        task: Array,
        list: Object
    },
    components: {
        NextBack
    },
    data () {
        return {

        }
    },
    methods: {
        destroy(id) {
            axios({
                
            })
        }
    }, 
    computed: {
        getStatus () {
            if (this.list.CategoryId === 2 || this.list.CategoryId === 3) {
                return [{
                    icon: "fas fa-backward",
                    name: "prev"
                }, {
                    icon: "fas fa-forward",
                    name: "next"
                }]
            } else if (this.list.CategoryId === 1) {
                return [
                    {
                        icon: "fas fa-forward",
                        name: "next"
                    }   
                ]
            } else if (this.list.CategoryId === 4) {
                return [
                    {
                        icon: "fas fa-backward",
                        name: "prev"
                    }
                ]
            }
        }
    }
}
</script>

<style>

</style>