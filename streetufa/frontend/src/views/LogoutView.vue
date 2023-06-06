<template>
    
</template>

<script>
export default {
    name: 'LogoutView',
    created () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'home' })
        })
    }
}
</script>