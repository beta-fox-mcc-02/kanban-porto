<template>
    <a class="panel-block">
        <span class="panel-icon">
            <i class="mdi mdi-library-books" aria-hidden="true"></i>
        </span>
        {{ card.title }}
    </a>
</template>

<script>
export default {
    name: 'Card',
    props: {
        card: Object
    }
}
</script>
