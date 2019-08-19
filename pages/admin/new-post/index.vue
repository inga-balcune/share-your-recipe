<template>
  <div>
  <section>
    <AppRecipeForm @submit='onSubmitted' :sending='sending' :email='email' />
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
data() {
  return {
    sending: false
  }
},
middleware: ['check-auth', 'auth'],
layout: 'admin-no-footer',
computed: mapState([
  // map this.token to store.state.token
  'token',
  'email'
]),
 methods: {
   onSubmitted(formData) {
     this.sending = true
     this.$store.dispatch('addRecipe', formData)
     .then(() => {
        this.sending = false
        this.$router.push('/admin')
     })
   }
 }
}
</script>

<style>

</style>
