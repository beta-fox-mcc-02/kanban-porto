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
                    this.changePage('landing')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetch() {
            this.$emit('fetch')
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    }

}
</script>

<style>

</style>