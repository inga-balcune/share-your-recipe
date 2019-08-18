<template>
    <md-toolbar md-elevation="0" class='nav-bar md-primary'>
      <a href='https://inga-balcune-portfolio.herokuapp.com/' target='_blank' class="md-title nav-bar__title"><span class="nav-bar__title--subtitle">Developed by</span><span> Inga Balcune</span></a>
      <md-button @click='openNav' v-if='!isActive' class="nav-bar__toggle md-icon-button">
          <md-icon>menu</md-icon>
      </md-button>
      <div class='nav-bar__main' :class="{active: isActive}">
        <nuxt-link class='nav-bar__links' to='/'><md-button :md-ripple="false" class="md-primary" @click='openNav'>Home</md-button></nuxt-link>
        <nuxt-link class='nav-bar__links' to='/admin'><md-button :md-ripple="false" class="md-primary" @click='openNav'>Dashboard</md-button></nuxt-link>
        <nuxt-link class='nav-bar__links' to=''><md-button :md-ripple="false" class="md-primary" @click="onCreateRecipe()">Create recipe</md-button></nuxt-link>
        <nuxt-link class='nav-bar__links' to=''><md-button :md-ripple="false" class="md-primary" @click='onLogout'>Logout</md-button></nuxt-link>
      </div>
    </md-toolbar>
</template>

<script>
export default {
 data() {
   return {
     isActive: false
   }
 },
 methods: {
   openNav() {
     this.isActive = !this.isActive
   },
   onCreateRecipe() {
     this.isActive = !this.isActive
     if (this.$router.currentRoute.name !== "admin-new-post") {
       return this.$router.push('admin/new-post')
     }
   },
   onLogout() {
     this.isActive = !this.isActive
     this.$store.dispatch('logout')
     this.$router.push('/admin/auth')
   }
 }
}
</script>

<style lang='scss' scoped>

.nav-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  @include respond(phone) {
      flex-direction: column;
  }

  &__title {
    display: block;
    flex-grow: 1;
    font-weight: 600;
    font-size: 1.6rem;
    text-decoration: none;
    text-transform: uppercase;
    color: $color-quaternary;
    padding: .5rem 0;

    &:hover {
      text-decoration: none;
    }

    @include respond(phone) {
      display: inline-block;
      font-size: 1.6rem;
      margin: 0;
    }

    &--subtitle {
        font-size: 1.2rem;
        display: block;
        margin-bottom: -1rem;

        &:hover {
          text-decoration: none;
        }

        @include respond(phone) {
          display: inline-block;
          font-size: 1.4rem;
        }
    }
  }

  &__main {
    display: none;
  }

  &__links {
    text-align: center;
  }
 
}

.active {
  display: block;

  @include respond(phone) {
    display: flex;
    flex-direction: column;
  }
}



    
    


</style>
