<template>
  <div class="app-main-layout">
    <Navbar @click="isOpenSidebar = !isOpenSidebar"/>
    <Sidebar v-model="isOpenSidebar"/>
    <main class="app-content" :class="{full: !isOpenSidebar}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'
export default {
  name: 'MainLayout',
  data: () => ({
    isOpenSidebar: true
  }),
  components: {
    Sidebar, Navbar
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
