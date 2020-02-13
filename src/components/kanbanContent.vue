<template>
    <div class="card" id="card-title">
        <div class="card-content">
            <p> {{ list.title }} </p>
        </div>
        <div class="card-tabs" id="plan-card-title-center">
            <i class="fas fa-user"></i>
            <i class="fas fa-edit"></i>
            <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a>
        </div>
        <nextBack
        
        ></nextBack>
    </div>
</template>

<script>
import nextBack from './nextBackContent'

export default {
    name: 'kanbanContent',
    props: {
        task: Array,
        list: Object
    },
    componentes: {
        nextBack
    },
    data () {
        return {

        }
    },
    computed: {
        getType () {
            
        }
    }
}
</script>

<style>

</style>