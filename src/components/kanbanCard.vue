<template>
    <div class="plan" >
        <div class="title" :style="getColor">
            <i :class="box.icon"></i> {{box.name}}
        </div>
        <div class="card" id="card-title">
            <div class="card-content">
                <p> {{ tasks }} </p>
            </div>
            <div class="card-tabs" id="plan-card-title-center">
                <i class="fas fa-user"></i>
                <i class="fas fa-edit"></i>
                <!-- <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a> -->
            </div>
            <div class="card-content grey lighten-4" id="plan-card-title-bottom">
                <i class="fas fa-forward" id="next"></i>
            </div>
        </div>
    </div>
</template>


<script>
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
    computed: {
        getColor () {
            return {
                "background-color": this.box.color
            }
        }
    }
}
</script>

<style scoped>
</style>