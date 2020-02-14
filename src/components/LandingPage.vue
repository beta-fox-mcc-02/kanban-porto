<template>
  <div>
    <div class="container margin-atas">
      <h1>NO KANBAN</h1>
      <h1>NO LIFE</h1>

      <div class="row my-3">
        <div class="col-10 col-sm-8 col-md-5 p">Manage your life with helpfull productivity tools like kanban. Be the best and be the winner like Kuuhaku</div>
      </div>
      <div class="row mt-5">
        <div class="col d-flex"> 
          <modalSign class="mx-1" sign="Login" @login="login"></modalSign>
          <modalSign class="mx-1" sign="Register" @login="login"></modalSign>
          <b-button @click="googleSign" pill class="pjg-10" variant="primary">Sign with <i class="fab fa-google"></b-button>
        </div>
      </div>
    </div>
   
    
  </div>
</template>

<script>
import modalSign from './ModalSign'
import axios from '../helpers/axios'
export default {
  name: 'LandingPage',
  components: {
    modalSign
  },
  methods: {
    googleSign () {
      this.$gAuth.signIn()
        .then(googleUser => {
          // console.log('user', googleUser)
          const id_token = googleUser.getAuthResponse().id_token
          // this.isSignIn = this.$gAuth.isAuthorized
          return axios({
            method: 'POST',
            url: '/auth/googleSign',
            data: {
              id_token
            }
          })
        })
        .then(({ data }) => {
          console.log(data)
          localStorage.token = data.token
          localStorage.id = data.id
          this.$emit('login')
        })
        .catch(err  => {
          //on fail do something
          console.log(err.response)
          console.log(err, 'ini error')
          this.$bvToast.toast('Google sign is failed', {
            title: `Error`,
            variant: 'danger',
            solid: true
          })
        })
    },
    login () {
      this.$emit('login')
    }
  }
}
</script>

<style scoped>
  .margin-atas {
    margin-top: 10rem
  }
  .p {
    text-align: justify
  }
  h1, .p {
    text-shadow: 2px 2px 8px wheat;
  }
  .pjg-10 {
    width: 8rem;
  }
</style>