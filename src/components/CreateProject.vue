<template>
  <div>
    <b-form @submit.prevent="createProject">
      <b-form-group
        id="input-group-1"
        label="Project Name :"
        label-for="input-1"
        description="This project name cannot be changed later, please choose wisely"
      >
        <b-form-input
          id="input-1"
          v-model="name"
          type="text"
          required
          placeholder="Enter Project Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Description :" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="description"
          placeholder="Enter Project Description"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import Axios from '../config'
  export default {
    name: 'create-project',
    data() {
      return {
        name: '',
        description: ''
      }
    },
    methods: {
      createProject () {
        Axios({
          method: 'POST',
          url: '/projects',
          data: {
            name: this.name,
            description: this.description
          },
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.$emit('changeNav', 'show-project')
        })
        .catch(_=> {})
      }
    }
  }
</script>