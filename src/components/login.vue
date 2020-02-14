<template>
  <div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>