var app = new Vue({
  el: '#app',
  data: {
   login: {
     email: '',
     password: ''
   }
  },
  methods: {
    resetForm() {
      this.email = '';
      this.password = '';
    }

  }
})