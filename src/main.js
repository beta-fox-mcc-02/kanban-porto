import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: h => h(App),
}).$mount('#app');

// new Vue({
//     el: '#app',
//     data: {
//         loginEmail: '',
//         loginPassword: ''
//     },
//     methods: {
//         loginUser: function() {
//             axios
//                 .post("http://localhost:3000/login", {
//                     email: this.loginEmail,
//                     password: this.loginPassword
//                     })
//                 .then(token => {
//                     localStorage.access_token = token.data;
//                 })
//                 .catch(error => {
//                     if (error.response) {
//                         /*
//                          * The request was made and the server responded with a
//                          * status code that falls out of the range of 2xx
//                          */
//                         console.log(error.response.data);
//                         console.log(error.response.status);
//                         console.log(error.response.headers);
//                     } else if (error.request) {
//                         /*
//                          * The request was made but no response was received, `error.request`
//                          * is an instance of XMLHttpRequest in the browser and an instance
//                          * of http.ClientRequest in Node.js
//                          */
//                         console.log(error.request);
//                     } else {
//                         // Something happened in setting up the request and triggered an Error
//                         console.log('Error', error.message);
//                     }
//                 });
//         }
//     }
// })  