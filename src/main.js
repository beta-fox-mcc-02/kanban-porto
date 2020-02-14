import Vue from "vue";
import App from "./App.vue";
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '152640385468-83ro7ugmg4c8s96aklj34tmb2vq6gjck.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App)
}).$mount("#app");

// new Vue({
//     el: "#app",
//     data: {
//         login: {
//             email: "",
//             password: ""
//         },
//         register: {
//             name: "",
//             email: "",
//             password: ""
//         },
//         task: {
//             title: ""
//         },
//         edit: {
//             title: ""
//         },
//         email: "",
//         password: "",
//         page: "login",
//         login_status: false,
//         backlog: '',
//         product: [{
//                 title: "product pertama"
//             },
//             {
//                 title: "product kedua"
//             },
//             {
//                 title: "product ketiga"
//             }
//         ],
//         development: [{
//                 title: "development pertama"
//             },
//             {
//                 title: "development kedua"
//             },
//             {
//                 title: "development ketiga"
//             }
//         ],
//         done: [{
//                 title: "done kesatu"
//             },
//             {
//                 title: "done kedua"
//             },
//             {
//                 title: "done ketiga"
//             }
//         ]
//     },
//     methods: {
//         fetchAll() {
//             const access_token = localStorage.getItem("access_token")
//             axios({
//                     method: 'get',
//                     url: "http://localhost:3000/task",
//                     headers: {
//                         access_token: access_token
//                     }
//                 })
//                 .then(response => {
//                     console.log(response.data.data[0].title)
//                     this.backlog = response.data.data
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         loginUser() {
//             const email = this.login.email;
//             const password = this.login.password;
//             console.log("masuk ke function login");
//             axios({
//                     method: "post",
//                     url: "http://localhost:3000/login",
//                     data: {
//                         email: email,
//                         password: password
//                     }
//                 })
//                 .then(response => {
//                     localStorage.setItem("access_token", response.data.token);
//                     this.fetchAll()
//                     console.log(this.backlog)
//                     this.page = "kanban";
//                     this.login = true;
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         },
//         registerUser() {
//             const name = this.register.name;
//             const email = this.register.email;
//             const password = this.register.password;
//             axios({
//                     method: "post",
//                     url: "http://localhost:3000/register",
//                     data: {
//                         name: name,
//                         email: email,
//                         password: password
//                     }
//                 })
//                 .then(response => {
//                     console.log(response);
//                     console.log("User created successfully");
//                     this.loginForm();
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         },
//         addTask() {
//             const title = this.task.title
//             const access_token = localStorage.getItem("access_token")
//             axios({
//                     method: "post",
//                     url: "http://localhost:3000/create",
//                     data: {
//                         title: title,
//                         CategoryId: 1
//                     },
//                     headers: {
//                         access_token
//                     }
//                 })
//                 .then(response => {
//                     console.log(response)
//                     console.log("Backlog added")
//                     this.kanban()
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         editTask(id) {
//             const title = this.task.title
//             const access_token = localStorage.getItem("access_token")
//             axios({
//                     method: "put",
//                     url: `http://localhost:3000/${id}`,
//                     data: {
//                         title: title,
//                         CategoryId: 1
//                     },
//                     headers: {
//                         access_token
//                     }
//                 })
//                 .then(response => {
//                     console.log(response)
//                     console.log("Backlog edited")
//                     this.page = "kanban"
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         deleteTask(id) {
//             const access_token = localStorage.getItem("access_token")
//             axios({
//                     method: 'delete',
//                     url: `http://localhost:3000/delete/${id}`,
//                     headers: {
//                         access_token
//                     }
//                 })
//                 .then(data => {
//                     this.kanban()
//                     console.log(data)
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         registerForm() {
//             this.page = "register";
//         },
//         loginForm() {
//             this.page = "login";
//         },
//         taskForm() {
//             this.page = "task";
//         },
//         editForm(id) {
//             console.log(id)
//             this.page = "edit"
//         },
//         kanban() {
//             this.page = "kanban";
//         },
//         logout() {
//             localStorage.clear()
//             this.page = "login"
//         }
//     },
//     created() {
//         if (localStorage) {
//             this.fetchAll()
//             this.page = "kanban";
//         } else {
//             this.page = "login";
//         }

//     }
// });