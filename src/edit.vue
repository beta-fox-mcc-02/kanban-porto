<template>
  <div class="edit">
      <p>Edit Form</p>
        <form class="form-create" method="post" @submit.prevent="submitEdit">
            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Title" v-model="title" >
                </div>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Description" v-model="description" ></textarea>
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
            title:this.editData.title,
            description:this.editData.description
        }
    },
    props:{
        editData:Object
    },
    methods:{
        changePage(page){
            this.$emit('changePage',page)
        },
        submitEdit(){
            const title = this.title
            const description = this.description
            const { id } = this.editData

            axios({
                method:"PUT",
                url:`https://secure-retreat-20188.herokuapp.com/${id}`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data:{
                    title, description
                }
            })
                .then(data=>{
                    this.changePage('home')
                    console.log(data,'success update')
                })
                .catch(err=>{
                    console.log(err,'error edit vue')
                })
        }
    }
}
</script>

<style>

</style>