<template>
  <div class="recipe-card card-expansion">
    <md-card class='md-elevation-3'>
        <md-card-media md-ratio="16:9">
          <img v-if="!thumbnail"  src="http://placehold.jp/24/cccccc/ffffff/250x150.png?text=image" :alt="title + ' image'" onerror="this.onerror=null;this.src='http://placehold.jp/24/cccccc/ffffff/250x100.png?text=image';">
          <img v-else :src="thumbnail" :alt="title + ' image'">
        </md-card-media>

        <md-card-header>
          <h2 class="md-subheading">{{title}}</h2>
        </md-card-header>

        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div>
              <nuxt-link :to="recipeLink" v-if='!isAdmin'><md-button>Learn more</md-button></nuxt-link>
              <nuxt-link :to="recipeLink" v-if='isAdmin'><md-button>Edit recipe</md-button></nuxt-link>
              <md-button v-if='isAdmin' @click='onDelete()'>Delete</md-button>
            </div>

            <md-card-expand-trigger v-if='!isAdmin'>
              <md-button class="md-icon-button">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>

          <md-card-expand-content v-if='!isAdmin'>
            <md-card-content>
              {{description}}
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
    </md-card>

  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  
  name: 'RecipeCard',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: false
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState([
      // map this.token to store.state.token
      'token'
    ]),
    recipeLink() {
      return this.isAdmin ? '/admin/' + this.id : '/recipes/' + this.id
    }
  },
  methods: {
    onDelete() {
      this.$store.dispatch('deleteRecipe', this.id)
    }
  }
}
</script>

<style lang='scss'>



.card-expansion {
    min-height: 38rem;
  }


</style>
