<template>
  <div>
    <NavbarVue
        @logout="logout"
        @toHome="toHome"
        :currentPage="currentPage">
    </NavbarVue>

    <div class="container mt-5">

      <!-- alert -->
      <AlertVue
        v-if="showAlert"
        :errorMessage="errorMessage"
        @closeErrorMessage="closeErrorMessage">
      </AlertVue>

      <!-- register -->
      <RegisterVue 
        v-if="currentPage === 'register'"
        @changePageTo="changePageTo"
        @renderErrorMessage="renderErrorMessage">
      </RegisterVue>

      <!-- login -->
      <LoginVue 
        v-else-if="currentPage === 'login'"
        @changePageTo="changePageTo"
        @renderErrorMessage="renderErrorMessage">
      </LoginVue>

    <div class="container-fluid pt-3" v-else-if="currentPage === 'home'">
      <h2 class="font-weight-light">Kanban Board</h2>
      <div class="small">Create your beautiful Kanban in here</div>
      <div class="row flex-row flex-sm-nowrap py-3" >
        <div class="col-sm-6 col-md-4 col-xl-3">
          <PanelVue class=""></PanelVue>
        </div>
        <button class="btn btn-light">Add category</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue';
import PanelVue from './components/Panel.vue';
import AlertVue from './components/Alert.vue';
import LoginVue from './components/Login.vue';
import RegisterVue from './components/Register.vue';

export default {
  name: 'App',
  data(){
    return {
      message: 'Hello world',
      currentPage: 'register',
      showAlert: false,
      errorMessage: ''
    };
  },
  components: {
    NavbarVue,
    PanelVue,
    AlertVue,
    LoginVue,
    RegisterVue
  },
  methods: {
    changePageTo(page){
      this.showAlert = false;
      this.currentPage = page;
    },
    logout(payload){
      localStorage.removeItem("access_token");
      this.changePageTo('register');
    },
    toHome(payload){
      if(localStorage.access_token) this.changePageTo('home');
      else this.changePageTo('register')
    },
    renderErrorMessage(err){
      this.errorMessage = '';
      const errMsgs = [];
      if(Array.isArray(err.message)){
        err.message.map(message => errMsgs.push(message));
      }else{  
        errMsgs.push(err.message);
      }
      this.errorMessage = errMsgs.join(' and ');
      this.showAlert = true;
    },
    closeErrorMessage(){
      this.showAlert = false;
    }
  },
  created(){
    console.log('ini dari app');
    if(localStorage.access_token){
      this.currentPage = 'home'
    }
  }
}
</script>

<style>

</style>