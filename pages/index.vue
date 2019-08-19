<template>
  <md-content class='header' :style="{ 'background-image': 'linear-gradient(rgba(234, 238, 240,0.3), rgba(234, 238, 240,0.3)), url(' + image + ')' }">
    <AppNavbar class="md-transparent" />
    <div class='home-section md-elevation-1'>
      <div class='home-section__content'>
        <h1>Share your recipe</h1>
        <md-button to="/recipes" class="md-primary md-raised">Seach Recipes</md-button>
        <md-button to="/admin/new-post" class="md-primary md-raised">Add Recipe</md-button>
      </div>


    </div>

  </md-content>
</template>

<script>
export default {
  layout: 'homepage',
  head () {
    return {
      title: 'Share Your Recipe homepage',
      meta: [
        { hid: 'description', name: 'description', content: 'Share Your Recipe introduction page' }
      ]
    }
  },
   data() {
      return {
        image: require('~/assets/img/food.jpg')
      }
  },
 
}
</script>

<style lang='scss'>

body {
   box-sizing: border-box;
   min-height: 100vh;
   background-color: $color-white;

   @include respond(tab-land) {
      position: relative;
      &::after {
         content: '';
         display: block;
         height: 0; /* Set same as footer's height */
       }
   }
}

.header {
  height: 100vh;
  background-size: cover;
  background-position: center;

  @include respond(phone) { 
    height: 120vh;
  }
}

.home-section {
  @include center-elem;
  padding: 3rem;
  width: 50%;
  // height: 50%;
  background-color: rgba($color-primary, .7);


  @include respond(tab-land) {
    width: 70%;
    // height: 50%;
  }

  @include respond(phone) {
    width: 90%;
    // height: 70%;
  }
  

  h1 {
    text-align: center;
    margin: 0 0 1rem 0;
    // color: darken( $color-primary, 20%);
    color: $color-white;
  }

    &__content {
      text-align: center;
    }

}

</style>
