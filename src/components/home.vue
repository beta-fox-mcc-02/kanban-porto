<template>
        <div class="home">
            <kanbanCard 
            v-for="(box, i) in boxes" 
            :key="i"
            :box="box"
            :tasks="tasks"
            ></kanbanCard>
            <!-- <div class="plan">
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
            </div> -->
    
            <!-- <div class="do">
                <div class="title">
                    <i class="fab fa-phoenix-framework"></i> DO
                </div>
                <div class="card" id="card-title-do" v-for="data in dataDo" :key="data.id">
                    <div class="card-content">
                      <p>{{ data.title }}</p>
                    </div>
                    <div class="card-tabs" id="do-card-title-center">
                        <i class="fas fa-user"></i>
                        <i class="fas fa-edit"></i>
                        <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a>
                    </div>
                    <div class="card-content grey lighten-4" id="do-card-title-bottom">
                        <i class="fas fa-backward" id="prev-do"></i>
                        <i class="fas fa-forward" id="next-do"></i>
                    </div>
                </div>
            </div>
            
            <div class="actual">
                <div class="title">
                    <i class="fab fa-phoenix-framework"></i> ACTUAL
                </div>
                <div class="card" id="card-title-actual" v-for="data in dataActual" :key="data.id">
                    <div class="card-content">
                      <p>{{ data.title }}</p>
                    </div>
                    <div class="card-tabs" id="actual-card-title-center">
                        <i class="fas fa-user"></i>
                        <i class="fas fa-edit"></i>
                        <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a>
                    </div>
                    <div class="card-content grey lighten-4" id="actual-card-title-bottom">
                        <i class="fas fa-backward" id="prev-do"></i>
                        <i class="fas fa-forward" id="next-do"></i>
                    </div>
                </div>
            </div>
    
            <div class="done">
                <div class="title">
                    <i class="fab fa-phoenix-framework"></i> DONE
                </div>
                <div class="card" id="card-title-done" v-for="data in dataDone" :key="data.id">
                    <div class="card-content">
                      <p>{{ data.title }}</p>
                    </div>
                    <div class="card-tabs" id="done-card-title-center">
                        <i class="fas fa-user"></i>
                        <i class="fas fa-edit"></i>
                        <a @click="hapus(data.id)"><i class="fas fa-trash-alt" ></i></a>
                    </div>
                    <div class="card-content grey lighten-4" id="done-card-title-bottom">
                        <i class="fas fa-backward" id="prev-do"></i>
                    </div>
                </div>
            </div> -->
        </div>
</template>

<script>
import kanbanCard from './kanbanCard'
import axios from 'axios'

export default {
    name: 'home',
    data () {
        return {
            tasks: [],
            boxes: [{
                name: 'Plan',
                color: 'red', 
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Do',
                color: 'yellow',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Actual',
                color: 'greenyellow',
                icon: "fab fa-telegram-plane"
            }, {
                name: 'Done',
                color: 'blue',
                icon: "fab fa-telegram-plane"
            }]
        }
    },
    methods: {
        fetchTask() {
            axios({
                method: "get",
                url: "http://localhost:3000/tasks",
                headers: {
                    token: localStorage.token
                }
            })
                .then(({data}) => {                  
                    this.tasks = data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    components: {
        kanbanCard
    },
    created() {
        if (localStorage.token) {
            this.fetchTask()
        }
    }
}
</script>

<style>

</style>