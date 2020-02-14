<template>
  <div>
    <navbar @changePage="changePage" :currentPage='currentPage'></navbar>
    <login v-if="currentPage == 'login'" @keregister="changePage" :currentPage="currentPage"></login>
    <register v-else-if="currentPage == 'register'" @regiseter="changePage" :currentPage="currentPage"></register>
    <home v-else-if="currentPage === 'main'" :currentPage="currentPage" @changePages="changePage" @edit='edit'></home>
    <add v-else-if="currentPage === 'addPage'" @changePages="changePage" :currentPage="currentPage"></add>
    <edit v-else-if="currentPage == 'edit'" :edit="editData"></edit>

  </div>
</template>

<script>
import navbar from './Compenent/Navbar'
import login from './Compenent/Login'
import register from './Compenent/Register'
import Home from './Compenent/Home'
import add from './Compenent/Add'
import edit from './Compenent/Edit'
export default {
    name : "App",
    // props : {

    // }
    data : () =>{
        return {
            currentPage : 'login',
            editData : {}
        }
    },
    components :{
        navbar,
        login,
        register,
        Home,
        add,
        edit
    },
    methods : {
        changePage(evet){
            console.log(evet)
             this.currentPage = evet
        },
        edit(data){
            this.editData = data
        }

    },
    created (){
        if(localStorage.token){
            this.currentPage = 'main'
        }
    }
}
</script>

<style>

</style>