<template>
  <div>
    <section>
      <AppRecipeForm :recipe="loadedRecipe" :email='email' :sending='sending' @submit='onSubmitted'/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import { mapState } from 'vuex'
export default {
data() {
  return {
    sending: false
  }
},
layout: 'admin-no-footer',
middleware: ['check-auth', 'auth'],
computed: mapState([
  // map this.token to store.state.token
  'token',
  'email'
]),
async asyncData({ $axios, params }) {
  const data = await $axios.$get(`https://share-your-recipe.firebaseio.com/recipes/${params.recipeId}.json`)
  return {loadedRecipe: data}
},
methods: {
    onSubmitted(loadedRecipe) {
      this.sending = true
      return this.$axios.$put(`https://share-your-recipe.firebaseio.com/recipes/${this.$route.params.recipeId}.json?auth=${this.token}`, loadedRecipe)
      .then(() => {
        this.sending = false
        this.$router.replace('/admin')
      })
      .catch(e => this.$router.replace('/error'))
      
    }
  }
}


</script>

<style scoped>

</style>
