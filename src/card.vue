<template>
    <div class="cards">
        <div class="BACKLOG">
            <div class="title">
                <h6>BACKLOG</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id } in backlog" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a @click="edit(id)"><i class="fas fa-pen" style="margin-right: 15px; color: navy;"></i></a>
                            <a ><i class="fas fa-trash" style="color: red;"></i></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Est odit tempore culpa adipisci. Quae rerum eveniet architecto perferendis, iure quisquam? Deleniti iusto rerum quos pariatur. In eius accusamus autem corporis. -->
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="fas fa-arrow-circle-right" style="color: yellowgreen;width: 40px;height: 50px;padding-right: 2px;"></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="TODO">
            <div class="title">
                <h6>TODO</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id } in todo" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                        {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a href="#" class="fas fa-pen" style="margin-right: 15px; color: navy;"></a>
                            <a href="#" class="fas fa-trash" style="color: red;"></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Est odit tempore culpa adipisci. Quae rerum eveniet architecto perferendis, iure quisquam? Deleniti iusto rerum quos pariatur. In eius accusamus autem corporis. -->
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="fas fa-arrow-circle-left" style="color: green;width: 40px;height: 50px;padding-left: 2px;"></a>
                        <a href="#" class="fas fa-arrow-circle-right" style="color: teal;width: 40px;height: 50px;padding-right: 2px;"></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="DONE">
            <div class="title">
                <h6>DONE</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id } in done" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a href="#" class="fas fa-pen" style="margin-right: 15px; color: navy;"></a>
                            <a href="#" class="fas fa-trash" style="color: red;"></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Est odit tempore culpa adipisci. Quae rerum eveniet architecto perferendis, iure quisquam? Deleniti iusto rerum quos pariatur. In eius accusamus autem corporis. -->
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="fas fa-arrow-circle-left" style="color: yellowgreen;width: 40px;height: 50px;padding-left: 2px;"></a>
                        <a href="#" class="fas fa-arrow-circle-right" style="color: blue;width: 40px;height: 50px;padding-right: 2px;"></a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="COMPLETED">
            <div class="title">
                <h6>COMPLETED</h6>
            </div>
            <div class="body-card" >
                <div class="card" v-for="{ title, description, id } in completed" :key="id">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{title}}
                        </p>
                        <div class="card-header-icon">
                            <a href="#" class="fas fa-pen" style="margin-right: 15px; color: navy;"></a>
                            <a href="#" class="fas fa-trash" style="color: red;"></a>
                        </div>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{description}}
                            <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Est odit tempore culpa adipisci. Quae rerum eveniet architecto perferendis, iure quisquam? Deleniti iusto rerum quos pariatur. In eius accusamus autem corporis. -->
                            <br><br>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="fas fa-arrow-circle-left" style="color: teal;width: 40px;height: 50px;padding-left: 2px;"></a>
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
            cards:[],
            classes:[
                {
                    id:1,
                    typeClass:'BACKLOG'
                },
                {
                    id:2,
                    typeClass:'TODO'
                },
                {
                    id:3,
                    typeClass:'DONE'
                },
                {
                    id:4,
                    typeClass:'COMPLETED'
                }
            ]
        }
    },
    props:{
        tasks:Array
    },
    methods:{
        fetch(){
            this.$emit('fetch')
        },
        edit(id){
            console.log(id,'card vue')
            this.$emit('edit',id)
        }
    },
    computed:{
        backlog(){
            let cards = this.tasks.filter(el => el.CategoryId == 1)
            console.log(this.tasks,'task pak')
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