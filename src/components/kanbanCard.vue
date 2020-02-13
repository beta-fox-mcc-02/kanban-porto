<template>
    <div class="plan">
        <div class="title">
            <i class="fab fa-telegram-plane"></i> PLAN
        </div>
        <div class="card" id="card-title" v-for="data in dataPlan" :key="data.id">
            <div class="card-content">
                <p>{{ data.title }}</p>
            </div>
            <div class="card-tabs" id="plan-card-title-center">
                <i class="fas fa-user"></i>
                <i class="fas fa-edit"></i>
                <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a>
            </div>
            <div class="card-content grey lighten-4" id="plan-card-title-bottom">
                <i class="fas fa-forward" id="next"></i>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'card',
    data () {
        return {
            
        }
    }
}
</script>

<style>

</style>