<template>
    <div>
        <!-- Ketika ini di click, muncul panel isinya task -->
        <a class="panel-block" @click="isComponentModalActive = true">
            <span class="panel-icon">
                <i class="mdi mdi-library-books" aria-hidden="true"></i>
            </span>
            {{ card.title }}
        </a>
        <b-modal
            :active.sync="isComponentModalActive"
            has-modal-card
            full-screen
            :can-cancel="false"
        >
            <CardModal :card="card"></CardModal>
        </b-modal>
    </div>
</template>

<script>
import CardModal from './CardModal'
export default {
    name: 'Card',
    props: {
        card: Object
    },
    components: {
        CardModal
    },
    data: function() {
        return {
            isComponentModalActive: false
        }
    }
}
</script>
