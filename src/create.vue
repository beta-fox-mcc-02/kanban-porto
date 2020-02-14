<template>
    <div class="create">
        <p>Create Kanban</p>
        <form class="form-create" method="post" @submit.prevent="create">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Title maximal 30 character" v-model="title">
                </div>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button type="submit" class="button is-link">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'create',
    data(){
        return {
            title:'',
            description:''
        }
    },
    methods:{
        changePage(page){
            this.$emit('changePage',page)
        },
        create(){
            const title = this.title
            const description = this.description

            axios({
                method:"POST",
                url:"https://secure-retreat-20188.herokuapp.com",
                headers:{
                    token: localStorage.getItem('token')
                },
                data:{
                    title,
                    description
                }
            })
                .then(data=>{
                    console.log(data,'masuk')
                    this.changePage('home')
                })
                .catch(err=>{
                    console.log(err,'error create vue')
                })
        }
    }
}
</script>

<style>

</style>