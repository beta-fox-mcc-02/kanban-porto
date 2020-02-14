<template>
    <div class="card-content">
        <div class="form-field">
            <label for="email">Title</label>
            <input type="email" id="email" v-model="title">
        </div><br>
        <div class="form-field">
            <label for="password">Description</label>
            <input type="email" id="password" v-model="Description">
        </div><br>
        <div class="button">
            <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click="add('main')">Submit
                <i class="material-icons right">send</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        taks : Array
    },
    data : () => {
        return {
            title : '',
            Description : ''
        }
    },
    methods : {
        add(event){
            let title = this.title
            let Description = this.Description
            axios({
                url : "http://localhost:3000/add",
                method :"post",
                data : {
                    title,
                    Description
                },
                headers : {
                    token : localStorage.token
                }
            })
                .then(({data}) => {
                    this.$emit('changePage',event)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
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
    },
    created(){
        if(localStorage.token){
            
        }
    }
}
</script>

<style>

</style>