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
        <div class="col-sm-6 col-md-4 col-xl-3 my-3">
          <PanelVue :panelTitle="panelTitle[0]" :panelId="1" @renderErrorMessage="renderErrorMessage" 
          @reloadOtherCategory="reloadOtherCategory"
          :reloadCat="reloadCat"></PanelVue>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-3 my-3">
          <PanelVue :panelTitle="panelTitle[1]" :panelId="2" @renderErrorMessage="renderErrorMessage"
          @reloadOtherCategory="reloadOtherCategory"
          :reloadCat="reloadCat"></PanelVue>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-3 my-3">
          <PanelVue :panelTitle="panelTitle[2]" :panelId="3" @renderErrorMessage="renderErrorMessage"
          @reloadOtherCategory="reloadOtherCategory"
          :reloadCat="reloadCat"></PanelVue>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-3 my-3">
          <PanelVue :panelTitle="panelTitle[3]" :panelId="4" @renderErrorMessage="renderErrorMessage"
          @reloadOtherCategory="reloadOtherCategory"
          :reloadCat="reloadCat"></PanelVue>
        </div>
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
      reloadCat: 99,
      message: 'Hello world',
      currentPage: 'register',
      showAlert: false,
      errorMessage: '',
      panelTitle: ['Backlog', 'Todo', 'Done', 'Completed'],
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
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('User signed out from google sign');
      })
    },
    toHome(payload){
      // TODO: use fetch and if error show error message
      if(localStorage.access_token) this.changePageTo('home');
      else this.changePageTo('register')
    },
    renderErrorMessage(err){
      console.log('isi error', err);
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
    },
    reloadOtherCategory(payload){
      this.reloadCat = payload;
    }
  },
  created(){
    if(localStorage.access_token){
      this.currentPage = 'home'
    }
  }
}
</script>

<style>

</style>