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
            <button class="btn waves-effect waves-light btn-small" type="submit" name="action" v-on:click="edit(editData)">Submit
                <i class="material-icons right">send</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data : ()=> {
        return {
            data : this.editData
        }
    },
    methods : {
        edit(event){
            let title = this.title
            let description = this.description
            console.log(event)
            axios({
                url : "http://localhost:3000/"+event.id,
                method : "put",
                headers : {
                    token : localStorage.token
                },
                data : {
                    title,
                    description
                }
            })
                .then(data => {
                    this.$emit('changePage',event)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    props : {
        editData : Object
    }
}
</script>

<style>

</style>