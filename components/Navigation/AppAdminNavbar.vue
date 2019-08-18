<template>
  <div>
    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Developed by Inga Balcune</h3>
      <nuxt-link to='/'><md-button>Home</md-button></nuxt-link>
      <nuxt-link to='/admin'><md-button>Dashboard</md-button></nuxt-link>
      <md-button class="md-primary" @click="onCreateRecipe()">Create recipe</md-button>
      <md-button @click='onLogout' class="md-primary">Logout</md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
 methods: {
   onLogout() {
     this.$store.dispatch('logout')
     this.$router.push('/admin/auth')
   },
   onCreateRecipe() {
     if (this.$router.currentRoute.name !== "admin-new-post") {
       return this.$router.push('admin/new-post')
     }
   }
 }
}

</script>

<style lang='scss' scoped>

</style>
