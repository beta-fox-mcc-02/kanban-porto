<template>
    <div class="card" id="card-title">
        <div class="card-content">
            <p> {{ list.title }} </p>
        </div>
        <div class="card-tabs" id="plan-card-title-center">
            <a @click="changePageEdit(list.id, list.title, list.CategoryId, list.UserId)"><i class="fas fa-edit"></i></a>
            <a @click="destroy(list.id)"><i class="fas fa-trash-alt" ></i></a>
        </div>
        <div  class="card-content grey lighten-4" id="plan-card-title-bottom">
            <NextBack
            v-for="(next, i) in getStatus"
            :key="i"
            :next="next"
            :list="list"
            @fetch="fetch"
            @changePage="changePage"
            ></NextBack>
        </div>
    </div>
</template>

<script>
import NextBack from './nextBackContent'
import axios from 'axios'

export default {
    name: 'kanbanContent',
    props: {
        task: Array,
        list: Object
    },
    components: {
        NextBack
    },
    data () {
        return {

        }
    },
    methods: {
        destroy(id) {
            console.log(id)
            axios({
                method: 'delete',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(data => {
                    this.fetch()
                    this.notifSuccess('successs deleted')
                    this.changePage('landing')
                })
                .catch(err => {
                    this.notifFailed(err.responseJSON.msg[0])
                })
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
        fetch() {
            this.$emit('fetch')
        },
        changePageEdit(id, title, CategoryId, UserId) {
            console.log(title, CategoryId, UserId, "DARIIIIIII KAONTEEENNNNNNNNNN")
            this.$emit('formEdit', id, title, CategoryId, UserId)
            this.changePage('editForm')
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        },
        notifFailed(msg) {
            this.$emit('notifFailed', msg)
        }
    }, 
    computed: {
        getStatus () {
            if (this.list.CategoryId === 2 || this.list.CategoryId === 3) {
                return [{
                    icon: "fas fa-backward",
                    name: "prev"
                }, {
                    icon: "fas fa-forward",
                    name: "next"
                }]
            } else if (this.list.CategoryId === 1) {
                return [
                    {
                        icon: "fas fa-forward",
                        name: "next"
                    }   
                ]
            } else if (this.list.CategoryId === 4) {
                return [
                    {
                        icon: "fas fa-backward",
                        name: "prev"
                    }
                ]
            }
        }
    }
}
</script>

<style>

</style>