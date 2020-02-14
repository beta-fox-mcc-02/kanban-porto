<template>
    <div id="new-organization-form">
        <div class="row">
            <form class="col s12" @submit.prevent="newOrganizationSubmit">
                <div class="row">
                    <div class="form-title card-title center-align activator">
                        New Organization
                    </div>
                    <div class="alert card-text center-align activator">
                        {{message}}
                    </div>
                    <div class="input-field col s12">
                        <input id="new-organization-name" type="text" class="validate" v-model="name">
                        <label for="name">Name</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
                    </div>
                    <div class="submit-container">
                        <button class="btn waves-effect waves-light form-submit" type="submit" name="action">
                            Add
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => {
        return {
            name: '',
            message: ''
        }
    },
    methods: {
        newOrganizationSubmit() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/organization',
                data: {
                    name: this.name
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('addOrganizationSuccess')
                })
                .catch(err => {
                    this.message = err.response.data
                })
        }
    }
}
</script>