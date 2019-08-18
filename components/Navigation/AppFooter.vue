<template>
  <md-toolbar class="md-transparent footer md-layout" md-elevation="0">
        <p class='footer-text md-layout-item md-large-size-73 md-medium-size-68 md-small-size-63 md-xsmall-size-100'>Site and copyright &copy; {{year}} Inga Balcune</p>
        <div class="link-container">
          <a href="https://www.linkedin.com/in/ingabalcune/" target='blank' class='links'>LinkedIn</a>
          <a href="https://www.instagram.com/ingabalcune/" target='blank' class='links'>Instagram</a>
          <a href="https://www.freecodecamp.org/inga-balcune" target='blank' class='links'>FreeCodeCamp</a>
        </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      info: 'md-large-size-6.6 md-medium-size-10 md-small-size-16.6 md-xsmall-size-100'
    }
  }
}
</script>

<style lang='scss' scoped>
.footer {
  position: fixed;
  bottom: 0;
}

.footer-text {
  color: darken($color-primary, 20%);

  @include respond(phone) {
    width: 100%;
    text-align: center;
  }
}

.link-container {

  @include respond(phone) {
    width: 100%;
    text-align: center;
  }
}

.links {
  padding: .5rem 2rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    background-color: rgba($color-primary, .1);
  }

}




</style>
