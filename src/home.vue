<template>
    <div class="home" v-if="currentPage === 'home'">
       <Card
       :tasks="tasks"
       @fetch="taskFetch"
       @edit="edit"
       ></Card> 
    </div>
</template>

<script>
import Card from './card'

export default {
    name:'home',
    data(){
        return{
            tasks:[]
        }
    },
    components:{
        Card
    },
    props:{
        currentPage:String
    },
    methods:{
        taskFetch(){
            axios({
                method:"GET",
                url:"http://localhost:3000",
                headers:{
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    this.tasks = data.data
                    console.log(this.tasks  ,'masuk')
                    return data.data
                })
                .catch(err=>{
                    console.log(err, 'error home vue')
                })
        },
        edit(id){
            console.log(id,'home vue')
        }
    },
    created(){
        if(localStorage.token){
            console.log('localstorage ada pak');
            
            this.taskFetch()
        }
    }
}
</script>

<style>

</style>