<template>
  <div class='recipes-section'>
    <AppEmptyState v-if='authRecipes.length < 1' />
    <section v-else>
        <h1 class='heading'>My recipes</h1>
        <md-button class='md-fab add-recipe' to="/admin/new-post">
          <md-icon>add</md-icon>
        </md-button>
      <md-field class='search-bar'>
        <label class='my-searchbar-label'>Search for a title, ingredient, meal type or cuisine!</label>
        <md-input v-model="searchText" @input='filterBySearchText(searchText)'></md-input>
      </md-field>
      <AppRecipeList isAdmin :recipes='filteredRecipes' />
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { mapState } from 'vuex'
export default {
  layout: 'admin-no-footer',
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      filteredRecipes: [],
      searchText: null
    }
  },
  computed: {
    ...mapGetters([
        'loadedRecipes',
        'authRecipes'
    ]),
 },
 methods: {
   filterBySearchText(text) {
      this.filteredRecipes = this.authRecipes.filter(recipe => recipe.title.toLowerCase().includes(text.toLowerCase()) || recipe.cuisine.toLowerCase().includes(text.toLowerCase()) || 
      recipe.ingredients.some(ingr => ingr.toLowerCase().includes(text.toLowerCase())) || recipe.types.some(ingr => ingr.toLowerCase().includes(text.toLowerCase())))
  }
 },
 mounted() {
   this.filteredRecipes = this.authRecipes
 },
 beforeRouteEnter(to, from, next) {
  next(vm => {
    if (from.name === 'admin-recipeId') {
      vm.$router.go(0)
    }
  })
},
}
</script>

<style lang='scss' scoped>

.recipes-section {
  margin-bottom: 2rem;
}

.heading {
  text-align: center;
  margin-bottom: 2rem;
}

.add-recipe {
  display: block;
  text-align: center;
  margin: 0 auto 2rem auto;
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> a2ee10a... layout changes
=======
>>>>>>> e398e62... typo
}

.search-bar {
  width: 40%;

  @include respond(tab-port) {
    width: 60%;
  }

  @include respond(phone) {
    width: 100%;
  }
}

.my-searchbar-label {
  @include respond(phone) {
    font-size: 1.4rem;
  }
}

</style>
