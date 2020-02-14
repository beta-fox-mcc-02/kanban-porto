<template>
  <div class="edit" v-if="currentPage == 'edit'">
        <form class="form-create" method="post" @submit.prevent="edit">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Title" v-model="title">
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
    data(){
        return {
            title:'',
            description:''
        }
    },
    props:{
        currentPage:String
    },
    methods:{
        edit(){
            const title = this.title
            const description = this.description
            console.log(this.title,this.description)

            axios({
                method:"PUT",
                url:"http://localhost:3000/:id",
                headers:{
                    token: localStorage.getItem('token')
                }
            })
        }
    }
}
</script>

<style>

</style>