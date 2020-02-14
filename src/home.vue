<template>
    <div class="home">
       <Card
       :tasks="tasks"
       @fetch="taskFetch"
       @edit="edit"
       @changePage="changePage"
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
    methods:{
        changePage(page){
            console.log(page,'change page home');
            this.$emit('changePage',page)
        },
        taskFetch(){
            axios({
                method:"GET",
                url:"https://secure-retreat-20188.herokuapp.com",
                headers:{
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    this.tasks = data.data
                })
                .catch(err=>{
                    console.log(err, 'error home vue')
                })
        },
        edit(data){
            this.$emit('edit',data)
        }
    },
    created(){
        if(localStorage.token){
            this.taskFetch()
        }else{
            this.changePage('login')
        }
    }
}
</script>

<style>

</style>