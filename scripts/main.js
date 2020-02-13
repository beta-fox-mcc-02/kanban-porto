new Vue ({
  el: '#doc',
  data: {
    registerData: {
      username: "",
      email: "",
      password: ""
    },

    loginData: {
      user: "",
      password: ""
    },

    currentPage: 'loginPage',

    tasks: []
  },

  methods: {
    register() {
      axios.post('http://localhost:3000/users/register', {
        username: this.registerData.username,
        email: this.registerData.email,
        password: this.registerData.password
      })
        .then(response => {
          this.registerData.username = ''
          this.registerData.email = ''
          this.registerData.password = ''
          Toastify({
            text: "Register success",
            position: 'center',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "success",
          }).showToast();
        })
        .catch(err => {
          this.registerData.username = ''
          this.registerData.email = ''
          this.registerData.password = ''
          Toastify({
            text: `${err}`,
            position: 'center',
            backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
            className: "error",
          }).showToast();
        })
    },

    login() {
      axios.post('http://localhost:3000/users', {
        user: this.loginData.user,
        password: this.loginData.password
      })
      .then(({data}) => {
        localStorage.token = data.token
        localStorage.username = data.username
        this.loginData.user = ''
        this.loginData.password = ''
        // this.currentPage = 'content'
        this.showContent()
        Toastify({
          text: "Login success",
          position: 'center',
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "success",
        }).showToast();
      })
      .catch(err => {
        this.loginData.user = ''
        this.loginData.password = ''
        Toastify({
          text: "Wrong username, email, or password",
          position: 'center',
          backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
          className: "error",
        }).showToast();
      })
    },

    logout() {
      localStorage.clear()
      this.showContent()
      Toastify({
        text: "Logout success",
        position: 'center',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "success",
      }).showToast();
    },

    showContent() {
      if(!localStorage.token) {
        this.currentPage = 'loginPage'
      } else {
        this.currentPage = 'content'
        this.findAllTask()
      }
    },

    findAllTask() {
      axios.get('http://localhost:3000/tasks', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          this.tasks = data
        })
        .catch(err => {
          Toastify({
            text: "Error fetching data",
            position: 'center',
            backgroundColor: "linear-gradient(to right, #EC6E55, #D74D35)",
            className: "error",
          }).showToast();
        })
    }
  },

  //hook lifecycle
  created: function() {
    this.showContent()
  },

  computed: {
    backlog () {
      if(this.tasks) {
        let arr = []
        this.tasks.forEach(task => {
          if(task.CategoryId == 1) arr.push(task)
        });
      }
      return arr
    }
  }

})