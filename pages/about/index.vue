<template>
  <div class='app-about-section'>
    <md-content>
      <h1>My Project</h1>
      <p>Hello, I'm Inga, a new front end web developer based in Copenhagen, Denmark.</p>
      <p>This is my second serious website development project. The first is Countries of the world project that you can access <a href="https://countries-of-the-world-project.herokuapp.com/" target='blank'>here</a>.</p>
      <h2>Project Overview</h2>
      <p>The main purpose of this project was to learn more Nuxt features like Middleware, login and user authentication.</p>
      <p>Also, I wanted to create a project using one of the material design component frameworks. After some research, I found Vue Material framework which allowed me to focus more on the development rather than putting all my efforts into designing the site.</p>
      <h2>Challenges</h2>
      <p>Some of the major challenges in this project were related to Vuex, error handling, using Axios with Firebase.</p>
      <h2>A warning</h2>
      <p>The published recipes are only meant for presentation purposes. All the recipes have been taken from the <a href="https://www.allrecipes.com">All Recipes</a> and photos from the Google images.</p>
      <p>Advisable not to follow the recipe instructions since the provided information may not be complete and accurate.</p>
    </md-content>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'All about the project of Share Your Recipe',
      meta: [
        { hid: 'description', name: 'description', content: 'Share Your Recipe web development project overview and challanges' }
      ]
    }
  }
 
}
</script>

<style lang='scss' scoped>

h1 {
  text-align: center;
}

.app-about-section {
  max-width: 76.8rem;
  margin: 0 auto;
  margin-bottom: 10rem;

  @include respond(phone) { 
    padding: 0 2rem;
  }

  &__content {
    // text-align: center;

    @include respond(phone) { 
      text-align: left;
    }
  }
}

</style>
