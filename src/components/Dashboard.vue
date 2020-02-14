<template>
    <div class="dashboard-container">
        <a @click="toAddOrganization" class="waves-effect waves-light btn-large s12 m6 l3">
            Add Organization<i class="material-icons right">cloud</i>
        </a>
        <div class="row">
            <div class="col s12 m6 l3" v-for="{id, name} in organizations" :key="id">
                <div class="organization-card card">
                    <div class="card-image">
                        <img class="responsive-img" :src="imageUrl" alt="bgOrg">
                        <span class="card-title">
                            <div class="row">
                                <button type="button" class="btn">
                                    <i class="medium material-icons left">delete</i>
                                    Delete {{name}}
                                </button>
                                <button type="button" class="btn" @click="getOrganizationBoard(id)">
                                    {{name}}<i class="material-icons right">arrow_forward</i>
                                </button>
                            </div>
                        </span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrganizationDashboard',
    props: {
        organizations: Array
    },
    data: () => {
        return {
            imageUrl: 'https://source.unsplash.com/random/800x600'
        }
    },
    methods: {
        getOrganizationBoard(id) {
            this.$emit('toKanbanBoard', id)
        },
        toAddOrganization() {
            this.$emit('toAddOrganization')
        },
        deleteOrganization(id) {
            this.$emit('deleteOrganization', id)
        }
    }
}
</script>

<style>

</style>