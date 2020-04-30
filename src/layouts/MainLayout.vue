<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpenSidebar = !isOpenSidebar"/>
      <Sidebar v-model="isOpenSidebar"/>
      <main class="app-content" :class="{full: !isOpenSidebar}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip-directive="'Create new record'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'

export default {
  name: 'MainLayout',
  data: () => ({
    isOpenSidebar: true,
    loading: true
  }),
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
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.getUserInfo).length) {
      await this.$store.dispatch('fetchUserInfo')
    }

    this.loading = false
  },
  components: {
    Sidebar, Navbar
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
