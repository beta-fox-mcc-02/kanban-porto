<template>
  <div>
    <!-- <b-button id="show-btn" @click="showModal">Open Modal</b-button> -->
    <b-button @click="showModal" pill class="pjg-10" variant="primary">{{ sign }}</b-button>

    <b-modal ref="my-modal" hide-footer :title="sign">
      <div class="d-block text-center">
        <h3 class="mb-4">Please {{ sign }} here</h3>
        <b-form @submit.prevent="onSubmit">

          <b-form-group style="text-align: left;" id="input-group-2" label="Your Name:" label-for="input-2" v-if="sign === 'Register'">
            <b-form-input
              id="input-2"
              v-model="name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="password"
              required
              placeholder="Enter Your Password"
              type="password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-primary" block>Submit</b-button>
        </b-form>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
  import registerVue from './register.vue'
  import axios from '../helpers/axios'
  export default {
    name: 'ModalSign',
    data () {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    props: {
      sign: String
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      onSubmit () {
        if (this.sign === 'Login') this.login()
        else this.register()
      },
      login () {
        let loader = this.$loading.show({
          canCancel: false,
          loader: 'bars',
        })
        this.hideModal()
        axios({
          method: 'post',
          url: '/auth/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            loader.hide()
            console.log(data)
            localStorage.token = data.token
            localStorage.id = data.id
            this.$emit('login')
            // this.hideModal()
          })
          .catch(err => {
            console.log(err.response)
            loader.hide()
          })
      },
      register () {
        console.log('masuk ke register')
        console.log(this.name)
        console.log(this.email)
        console.log(this.password)
        let loader = this.$loading.show({
          canCancel: false,
          loader: 'bars',
        })
        this.hideModal()
        axios({
          method: 'post',
          url: '/auth/register',
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            loader.hide()
            localStorage.token = data.token
            localStorage.id = data.id
            this.$emit('login')
          })
          .catch(err => {
            console.log(err.response)
            loader.hide()
          })
            
      }
 
    }
  }
</script>

<style scoped>
  .pjg-10 {
    width: 8rem;
  }
</style>