<template>
    <div class="container" id="homepage">
    <cards 
    :taks="task"
    @fetch='fecthData'
    @edit='edit'
    @changePages="changePage"
    ></cards>
    </div>
    
</template>

<script>
import modal from './Add'
import cards from './Cards'
export default {
    props : {
        currentPage : String
    },
    data () {
        return {
            task : []
        }
    },
    components : {
        cards,
        modal
    },
    methods : {
        fecthData(){
            axios({
                url : "http://localhost:3000",
                method : "get",
                headers : {
                    token : localStorage.token
                }
            })
                .then(({data}) =>{
                    this.task = data
                    // console.log(this.task,'ini task')
                })
                .catch(err => {
                    // console.log(err)
                })
        },
        changePage(event){
            console.log(event)
            // this.fecthData()
            this.$emit('changePages',event)
        },
        edit(data){
            console.log(data,'ini data')
            this.$emit('edit',data)
        }

    },
    created (){
        if(this.currentPage === 'main'){
            this.fecthData()
        }
    }

}
</script>

<style>

</style>