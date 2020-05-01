<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (firebaseErr) {
      // eslint-disable-next-line no-unused-expressions
      this.$error(firebaseErr.message)
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
