<template>
    <div class="cards">
        <div class="BACKLOG">
            <div class="title">
                <h6>BACKLOG</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ id, title, description, CategoryId } in backlog" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a @click="edit({ id, title, description })"><i class="fas fa-pen" style="margin-right: 15px; color: navy;"></i></a>
                            <a @click="destroy(id)"><i class="fas fa-trash" style="color: red;"></i></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a @click="move('right', CategoryId, id)"><i class="fas fa-arrow-circle-right" style="color: yellowgreen;width: 40px;height: 50px;padding-right: 2px;"></i></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="TODO">
            <div class="title">
                <h6>TODO</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id, CategoryId } in todo" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                        {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a @click="edit({ id, title, description })"><i class="fas fa-pen" style="margin-right: 15px; color: navy;"></i></a>
                            <a @click="destroy(id)"><i class="fas fa-trash" style="color: red;"></i></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a @click="move('left', CategoryId, id)"><i class="fas fa-arrow-circle-left" style="color: green;width: 40px;height: 50px;padding-left: 2px;"></i></a>
                        <a @click="move('right', CategoryId, id)"><i class="fas fa-arrow-circle-right" style="color: teal;width: 40px;height: 50px;padding-right: 2px;"></i></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="DONE">
            <div class="title">
                <h6>DONE</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id, CategoryId } in done" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a @click="edit({ id, title, description })"><i class="fas fa-pen" style="margin-right: 15px; color: navy;"></i></a>
                            <a @click="destroy(id)"><i class="fas fa-trash" style="color: red;"></i></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a @click="move('left', CategoryId, id)"><i class="fas fa-arrow-circle-left" style="color: yellowgreen;width: 40px;height: 50px;padding-left: 2px;"></i></a>
                        <a @click="move('right', CategoryId, id)"><i class="fas fa-arrow-circle-right" style="color: blue;width: 40px;height: 50px;padding-right: 2px;"></i></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="COMPLETED">
            <div class="title">
                <h6>COMPLETED</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id, CategoryId } in completed" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a @click="edit({ id, title, description })"><i class="fas fa-pen" style="margin-right: 15px; color: navy;"></i></a>
                            <a @click="destroy(id)"><i class="fas fa-trash" style="color: red;"></i></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a @click="move('left', CategoryId, id)"><i class="fas fa-arrow-circle-left" style="color: teal;width: 40px;height: 50px;padding-left: 2px;"></i></a>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',
    data(){
        return{
            cards:[]
        }
    },
    props:{
        tasks:Array
    },
    methods:{
        changePage(page){
            console.log(page,'change page card');
            this.$emit('changePage',page)
        },
        fetch(){
            this.$emit('fetch')
        },
        edit(data){
            this.$emit('edit',data)
            this.changePage('edit')
        },
        destroy(id){
            axios({
                method:"DELETE",
                url:`https://secure-retreat-20188.herokuapp.com/${id}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
                .then(()=>{
                    this.fetch()
                    console.log('success delete')
                })
                .catch(err=>{
                    console.log(err,'error destroy')
                })
        },
        move(direction, idCategory, id){
            let CategoryId = idCategory
            direction == 'right' ? CategoryId++ : CategoryId--
            axios({
                method:"PUT",
                url:`https://secure-retreat-20188.herokuapp.com/${id}`,
                headers:{
                    token: localStorage.getItem('token')
                },
                data:{
                    CategoryId
                }
            })
                .then(data=>{
                    console.log(data,'anjaay')
                    this.fetch()
                })
                .catch(err=>{
                    console.log(err,'error edit vue')
                })
        }
    },
    computed:{
        backlog(){
            let cards = this.tasks.filter(el => el.CategoryId == 1)
            return cards
        },
        todo(){
            let cards = this.tasks.filter(el => el.CategoryId == 2)
            return cards
        },
        done(){
            let cards = this.tasks.filter(el => el.CategoryId == 3)
            return cards
        },
        completed(){
            let cards = this.tasks.filter(el => el.CategoryId == 4)
            return cards
        }
    }
}
</script>

<style>

</style>