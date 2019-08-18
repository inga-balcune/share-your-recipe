<template>
  <div>
    <NewAdminNavbar />
    <nuxt class='default' />
    <AppFooter />
  </div>
</template>

<style lang='scss' scoped>

.default {
  padding: 0 3rem;

  @include respond(phone) {
    min-height: 100vh;
  }
}


</style>
