<template>
<div id="UpdateModal">
  <transition name="modal">
  <div class="row modal-mask" id="update">
    <div class="col s4 offset-s4 modal-wrapper">
      <div class="card z-depth-3 modal-container">
        <div class="card-content">
          <span class="card-title center">Update Task</span>
          <form id="login-form" @submit.prevent="updateTask()">
            <div class="row">
              <div class="col s12 input-field">
                <input id="title" type="text" class="validate" v-model="title">
              </div>
            </div>
            <div class="row">
              <div class="col s12 input-field">
                <input id="description" type="text" class="validate" v-model="description" required>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center">
                <button class="btn waves-effect waves-light" type="submit" name="action">Update Task</button> <br>
                <a id="exit" class="btn-flat" @click.prevent="$emit('updateModalToggle')">exit</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "UpdateModal",
  data() {
    return {
      title: this.task.title,
      description: this.task.description
    }
  },

  props: {
    task: Object
  },

  methods: {
    updateTask(TaskId) {
      let id = TaskId
      Axios({
        url: `https://immense-refuge-43743.herokuapp.com/tasks/${this.task.id}/update`,
        method: "PUT",
        data: {
          title: this.title,
          description: this.description
        },
        headers: {token: localStorage.token}
      })
        .then(({data}) => {
          this.$emit('notification', null, data.msg)
          this.$emit('updateModalToggle')
          this.$emit('showContent')
        })
        .catch(err => {
          this.$emit('notification', err)
          this.$emit('updateModalToggle')
        })
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 10rem auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#exit {
  margin-top: 1rem;
  padding: 1rem
}
</style>