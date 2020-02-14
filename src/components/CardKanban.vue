<template>
  <div class="items border border-light cardKanban">
    <div class="card shadow-sm"  v-if="!editForm">
      <div class="card-body p-2 cd">
        <p>
          {{task.title}}
        </p>
        <div id="action-task">
          <a href="" @click.prevent="editBotton"><span class="glyphicon glyphicon-pencil"></span></a>
          <a href="" @click.prevent="deleteCard"><span class="glyphicon glyphicon-trash"></span></a>
          <div>
            <a href="" @click.prevent='prevBotton' v-if="IdCategory!=1"><span class="glyphicon glyphicon-chevron-left"></span></a>
            <a href="" @click.prevent='nextBotton' v-if="IdCategory!=4"><span class="glyphicon glyphicon-chevron-right"></span></a>
          </div>
        </div>  
      </div>
    </div>  
    <div v-else-if="editForm">
      <form class="add-form" @submit.prevent="edit">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter New Task" required v-model="input">
        </div>
      </form>
    </div>  
  </div>
</template>

<script>
import axios from '../config/axios'

export default {
  name : 'CardKanban',
  props:{
    task : Object,
    IdCategory : Number
  },
  data(){
    return{
      input : '',
      editForm : false
    }
  }, 
  methods:{
    deleteCard(){
      console.log(this.IdCategory, 'ini id');
      let id = this.task.id
      axios({
        method : 'DELETE',
        url : `/tasks/${id}`,
        headers : {
          token: localStorage.token
        }
      })
      .then(({data})=>{
        this.$emit('fetchData')
      })
      .catch(err=>{
        console.log(err.response.data)
      })
    },
    nextBotton(){
      this.$emit('nextBotton',this.task.title, this.task.id)
    },
    prevBotton(){
      this.$emit('prevBotton',this.task.title, this.task.id)
    },
    editBotton(){
      this.editForm = true
      this.input = this.task.title
    },
    edit(){
      let id = this.task.id
      let CategoryId = this.IdCategory
      let title = this.input
      let data = {
        title,CategoryId
      }
      axios({
        method : 'PUT',
        url : `/tasks/${id}`,
        headers : {
          token: localStorage.token
        },
        data
      })
      .then(({data})=>{
        this.editForm = false
        this.$emit('fetchData')
      })
      .catch(err=>{
        console.log(err.response.data)
      })
    }
  }

}
</script>

<style>
.cardKanban{
  margin-bottom: 5px;
}

#action-task{
  display: flex;
  justify-content: space-between;
  background-color: aliceblue;
  padding: 2px 10px;
  border-radius: 5px; 
}


.editForm{
  display: flex;
  justify-content: space-between;
} 
.cd{
  padding: 5px 10px;
}

</style>