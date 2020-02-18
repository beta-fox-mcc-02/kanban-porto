<template>
    <div>
        <NavbarKanban 
            class="navbar app" 
            :currentPage="currentPage" 
            @changePage="changePage"
        >
        </NavbarKanban>

        <FrameKanban 
            class="frame"
            :currentPage="currentPage"
            @changePage="changePage"
        >
        </FrameKanban>
    </div>
</template>

<script>

import NavbarKanban from "./components/NavbarKanban"
import FrameKanban from "./components/FrameKanban"

export default {
    name: "KanbanProject",
    data() {
        return {
            currentPage: 'logout'
        }
    }, 
    components: {
        NavbarKanban,
        FrameKanban
    },
    methods: {
        changePage(status){
            this.currentPage = status
        }
    },
    created() {
        if(localStorage.access_token){
           this.currentPage = "login"
        } else {
          this.currentPage = "logout"
        }
    }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Roboto";
  font-size: 14px;
  line-height: 1.3em;
  height: 100vh;
  display: grid;
  grid-template-rows: 40px 50px 1fr;
  background-color: #5c190057;
  color: #513640
}

.navbar {
  justify-content: space-between;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
}

.title{
  color: #f9efff;
  font-size: 60px;
  align-items: center
}

.navbar.app {
  background-color: #66545e;
  font-size: 30px;
  font-family: 'Josefin Sans', sans-serif;
}

.logout{
  font-size: 20px;
  color:#66545e;
  background-color:#ecf3ee81;
  border: none; 
  padding: 7px 10px;
  border-radius: 5px;
}

.frame {
  display: flex;
  justify-content: center;
  overflow-y: auto;
  height: 900px;
  
}

.lists {
  display: flex;
  width: 1507px;
  justify-content: center
}

.lists > * {
  flex: 0 0 auto;
  margin-left: 10px;
}
.lists::after {
  content: "";
  flex: 0 0 10px;
}

.addTask {
  height: 50px;
  width: 140px;
  font-size: 20px;
  color: #260040;
  border: none;
  border-radius: 80px;
}

.list {
  width: 364px;
  height: calc(100% - 10px - 17px);
  margin: 25px;
  align-items: center;
}
.list > * {
  background-color: #e2e4e6;
  color: #333;
  padding: 0 10px;
}
.list header {
  line-height: 48px;
  font-size: 28px;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-content: center;
  font-family: 'Josefin Sans', sans-serif;
}
.list footer {
  line-height: 36px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #888;
}
.list ul {
  list-style: none;
  margin: 0;
  max-height: calc(100% - 36px - 36px);
  overflow-y: auto;
}
.list ul li {
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.list ul li:not(:last-child) {
  margin-bottom: 10px;
}
.list ul li img {
  display: block;
  width: calc(100% + 2 * 10px);
  margin: -10px 0 10px -10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

</style>