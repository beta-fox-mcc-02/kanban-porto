Vue.component('nav-bar', {
   data : {
      return {
         
      }
   },
   template: `
   <div>
      <nav>
         <div>
            <ul>
               <li>Home</li>
               <li>Sign In</li>
               <li>Register</li>
               <li>Sign Out</li>
            </ul>
         </div>
      </nav>
   </div>
   `
})

Vue.component('home', {
   data : function() {
      return {
         currentPage: 'home'
      }
   },
   template : `
   <div>
      <h1> Welcome to Home </h1>
   </div>
   `
})

Vue.component('register', {
   // template : "<h1>Testing</h1>"
   data: function() {
      return {
         name:'',
         password:'',
         email:''
      }
   }, 
   methods : {
      registering : function () {
         console.log('masuk register')
         let name = this.name
         let email = this.email
         let password = this.password
         axios({
            method: "POST",
            url: "http://localhost:3000/users/register",
            responseType: 'json',
            data : {
               name,
               email,
               password
            }
         })
            .then(data => {
               console.log(data, 'berhasil register')
               app.currentPage = 'login'
            })
            .catch(err => {
               console.log(err, 'gagal register')
               
            })
      }
   },
   template: `
   <div>
      <h1>Register</h1>
      <form >
         <label>Name</label>
         <input type="text" v-model="name">
         <label>Email</label>
         <input type="email" v-model="email">
         <label>Password</label>
         <input type="password" v-model="password"> 
         <input type="submit" v-on:click.prevent="registering">
      </form>
   </div>
   `
})

Vue.component('login', {
   data: function() {
      return {
         name:'',
         password:'',
         email:''
      }
   }, 
   methods : {
      login : function () {
         let name = this.name
         let email = this.email
         let password = this.password
         axios({
            method: "POST",
            url: "http://localhost:3000/users/login",
            data : {
               name,
               email,
               password
            }
         })
            .then(data => {
               console.log(data, 'berhasil login')

            })
            .catch(err => {
               console.log(err, 'gagal login')
               
            })
      }
   },
   template: `
   <div>
      <h1>Login</h1>
      <form >
         <label>Name</label>
         <input type="text" v-model="name">
         <label>Email</label>
         <input type="email" v-model="email">
         <label>Password</label>
         <input type="password" v-model="password"> 
         <input type="submit" v-on:click.prevent="login">
      </form>
   </div>
   `
})

Vue.component('board', {
   data : function () {
      return
   },
   methods : {

   },
   template : {

   }
})

let app = new Vue({
   el: '#app',
   data: {
      currentPage : 'register'
      // ,
      // message: `You loaded this page on ${new Date().toLocaleString()}`,
      // seen : false,
      // todos : [
      //    { text: "Learn Javascript" },
      //    { text: "Learn Vue" },
      //    { text: "Build something new" }
      // ],
      // message2 : 'Hello Vue.js!',
      // message3 : 'Hello Vue.js! 3',
      // groceryList : [
      //    { id:0, text: 'Vegetables' },
      //    { id:1, text: 'Cheese' },
      //    { id:2, text: 'Whatever else human are supposed to eat' }
      // ]
   },
   methods: {
      // reverseMessage : function() {
      //    this.message2 = this.message2.split('').reverse().join('')
      // }
   }
})

