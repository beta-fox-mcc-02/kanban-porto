const app = new Vue({
  el: '#app',
  data: {
    currentPage: 'register',
    showErrorAlert: false,
    showSuccessAlert: false,
    errorMsg: '',
    registerInput: { username: '', email: '', password: '' },
    loginInput: { email: '', password: ''}
  },
  methods: {
    logout(){
      this.changePageTo('register');
      localStorage.removeItem('access_token'); 
    },
    register(){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          username: this.registerInput.username,
          email: this.registerInput.email,
          password: this.registerInput.password
        }
      })
        .then(res => {
          const { access_token } = res.data 
          localStorage.access_token = access_token;    
          this.emptyRegisterInput();
          this.changePageTo('home');
        })
        .catch(err => {
          this.errorMessages(err.response.data)
          this.emptyRegisterInput();
        })
    },
    login(){
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: { email: this.loginInput.email, password: this.loginInput.password }
      })
        .then(res => {
          const { access_token } = res.data;
          localStorage.access_token = access_token;
          this.emptyLoginInput();
          this.changePageTo('home');
        })
        .catch(err => {
          this.errorMessages(err.response.data);
          this.emptyLoginInput();
        })
    },
    changePageTo(page){
      this.closeErrorMessage();
      this.currentPage = page;
    },
    errorMessages(err){
      const errMsgs = [];
      if(Array.isArray(err.message)){
        err.message.map(message => errMsgs.push(message));
      }else{  
        errMsgs.push(err.message);
      }
      this.errorMsg = errMsgs.join(' and ');
      this.showErrorAlert = true;
    },
    closeErrorMessage(){
      this.showErrorAlert = false;
      this.errorMsg = '';
    },
    emptyRegisterInput(){
      this.registerInput.username = '';
      this.registerInput.email = '';
      this.registerInput.password = '';
    },
    emptyLoginInput(){
      this.loginInput.email = '';
      this.loginInput.password = '';
    },
    toHome(){
      axios({
        method: 'GET',
        url: 'http://localhost:3000/kanban',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.errorMessages(err.response.data);
        })
    }
  },
  created(){
    if(localStorage.access_token){
      this.changePageTo('home');
    }
  }
})