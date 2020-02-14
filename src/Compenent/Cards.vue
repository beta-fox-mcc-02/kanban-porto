<template>
    <div class="container" id="homepage">
        <div class="cards">
            <div class="Backlog">
                <div class="title">Backlog</div>
                <div class="card" id="content"  v-for="{id,title,descreption,CategoryId} in backlog" :key="id">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
                        <div class="button">
                            <button @click="edit({id,title,descreption,CategoryId})">edit</button>
                            <button @click="deleted(id)">delete</button>
                            <button @click.prevent="editRight({id,title,descreption,CategoryId})">Right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards">
            <div class="Todo"  >
                <div class="title">To Do</div>
                <div class="card" id="content" v-for="{id,title,descreption,CategoryId} in Todo" :key="id">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
                        <div class="button">
                            <button @click="edit({id,title,descreption,CategoryId})">edit</button>
                            <button @click="deleted(id)">delete</button>
                            <button @click="editLeft({id,title,descreption,CategoryId})">Left</button>
                            <button @click="editRight({id,title,descreption,CategoryId})">Right</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cards">
            <div class="Doing"  >
                <div class="title">Doing</div>
                <div class="card" id="content" v-for="{id,title,descreption,CategoryId} in Doing" :key="id">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                        <div class="button">
                            <button @click="edit({id,title,descreption,CategoryId})">edit</button>
                            <button @click="deleted(id)">delete</button>
                            <button @click="editLeft({id,title,descreption,CategoryId})">Left</button>
                            <button @click="editRight({id,title,descreption,CategoryId})">Right</button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        <div class="cards">
            <div class="End"  >
                <div class="title">Done</div>
                <div class="card" id="content" v-for="{id,title,descreption,CategoryId} in End" :key="id">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">This is a link</a></p>
                        <div class="button">
                            <button @click="edit({id,title,descreption,CategoryId})">edit</button>
                            <button @click="deleted(id)">delete</button>
                            <!-- <button @click="editRight({id,title,descreption,CategoryId})">Right</button> -->
                            <button @click="editLeft({id,title,descreption,CategoryId})">Left</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        taks : Array,
    },
    data : () => {
        return {
            
        }
    },
    computed : {
        backlog(){
            let cards = this.taks.filter(el => el.CategoryId == "1")
            console.log(cards)
            return cards
            // return backlog
        },
        Todo(){
            let cards = this.taks.filter(el => el.CategoryId == "2")
            return cards
            // return backlog
        },
        Doing(){
            let cards = this.taks.filter(el => el.CategoryId == "3")
            return cards
            // return backlog
        },
        End(){
            let cards = this.taks.filter(el => el.CategoryId == "4")
            return cards
            // return backlog
        }
    },
    methods : {
        changePage(event){
            this.$emit("changePages",event)
        },
        deleted(id){
            axios({
                url : "http://localhost:3000/"+id,
                method : "delete",
                headers : {
                    token : localStorage.token
                }
            })
                .then(data => {
                    this.fetch()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editLeft(id){
            // console.log(id.id)
            // console.log(Number(id.CategoryId)+1)
            let categoryId = Number(id.CategoryId)-1
            console.log(typeof categoryId)
            axios({
                url : "http://localhost:3000/"+id.id,
                method : "put",
                headers : {
                    token : localStorage.token
                },
                data :  {
                    title : id.title,
                    Descreption : id.Descreption,
                    CategoryId : categoryId
                }
            })
                .then(data => {
                    this.fetch()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editRight(id){
            // console.log(id.id)
            // console.log(Number(id.CategoryId)+1)
            let categoryId = Number(id.CategoryId)+1
            console.log(id)
            axios({
                url : "http://localhost:3000/"+id.id,
                method : "put",
                headers : {
                    token : localStorage.token
                },
                data :  {
                    title : id.title,
                    Descreption : id.Descreption,
                    CategoryId : categoryId
                }
            })
                .then(data => {
                    this.fetch()
                    console.log(data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetch(){
            this.$emit('fetch')
        },
        edit(data){
            this.$emit('edit',data)
            this.changePage('edit')
        },
        
        

    }

}
</script>

<style>

</style>