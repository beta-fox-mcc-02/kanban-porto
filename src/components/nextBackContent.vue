<template>
    <div>
        <a @click="update(list.id, list.CategoryId, next.name)" ><i :class="next.icon" :id="next.name"></i></a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "NextBack",
    props: {
        next:Object,
        list:Object
    },
    data () {
        return {

        }
    },
    methods: {
        update(id, idCategory, desc) {
            let CategoryId = 0
            if (desc === 'next') {
                CategoryId = idCategory + 1
            } else if (desc === 'prev') {
                CategoryId = idCategory - 1
            }

            axios({
                method: "put",
                url: `http://localhost:3000/tasks/${id}`,
                data: {
                    CategoryId
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(data => {
                    this.fetch()
                    this.notifSuccess('task updated')
                    this.changePage('landing')
                })
                .catch(err => {
                    this.notifFailed('updated task failed')
                })
        },
        fetch() {
            this.$emit('fetch')
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
        notifSuccess(msg) {
            this.$emit('notifSuccess', msg)
        },
        notifFailed(msg) {
            this.$emit('notifFailed', msg)
        }
    }

}
</script>

<style>

</style>