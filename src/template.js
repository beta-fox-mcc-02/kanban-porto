

const app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      currentPage: 'login',
      tasks: [],
      token: localStorage.token,
      login: {
        email: '',
        password: ''
      },
      inputTask: {
        title: '',
        description: ''
      },
      editTask: {
        title: '',
        description: ''
      }
    },
    methods: {
      showLogin() {
        this.currentPage = 'login' 
      },
      showContent() {
        this.currentPage = 'contentPage'
        this.fetchTasks()
      },
      fetchTasks() {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/tasks',
          headers: { token: this.token }
        })
          .then(response => {
            console.log(response.data, '============')
            this.tasks = response.data
          })
          .catch(err =>{
            console.log(err)
          })
      },
      addTask() {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/tasks',
          headers: { token: this.token },
          data: {
            title: this.inputTask.title,
            description: this.inputTask.description
          }
        })
        .then(response => {
          this.currentPage = 'contentPage'
          this.fetchTasks()
        })
      },
      editTask(id) {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/tasks/' + id,
          headers: { token: this.token },
          data: {
            title: this.editTask.title,
            description: this.editTask.description
          }
        })
        .then(response => {
          this.currentPage = 'contentPage'
          this.fetchTasks()
        })
      }
    },
    created() {
      if(this.token) {
        this.showContent()
      }
      else {
        this.showLogin()
      }
    }
  })