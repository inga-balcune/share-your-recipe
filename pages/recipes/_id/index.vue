<template>
  <div>
    <section class='upper-section md-layout'>
      <div class="heading md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100">
        <h3 class='heading__title'>{{recipe.title}}</h3>
        <div class='md-layout heading__time-container'>
          <md-icon class='md-layout-item md-xlarge-size-10 md-large-size-10 md-medium-size-15 md-small-size-10 md-xsmall-size-5'>schedule</md-icon>

          <div class='heading__time md-layout-item md-layout'>

            <div class="md-subhead md-layout-item md-large-size-25">
              <span class='heading__time--prep'>Prep</span>
              <span class='heading__time--prep__min'>{{recipe.prep}} m</span>
            </div>

            <div class="md-subhead md-layout-item md-large-size-25">
              <span class='heading__time--prep'>Cook</span>
              <span class='heading__time--prep__min'>{{recipe.cook}} m</span>
            </div>

            <div class="md-subhead md-layout-item md-large-size-25">
              <span class='heading__time--prep'>Ready in</span>
              <span class='heading__time--prep__min'>{{+recipe.cook + +recipe.prep}} m</span>
            </div>

            <div class="servings md-subhead md-layout-item md-large-size-25">
              <span class='heading__time--prep'>Servings</span>
              <span class='heading__time--prep__min'>{{+recipe.servings}}</span>
            </div>
          </div>
        </div>
        <div class='heading__description'>"{{recipe.description}}"</div>

       
          <div class='best-for'>Best for:</div>
          <div class='best-for__items'>
            <md-chip class='best-for__items--chip md-accent' v-for='(type, typeIndex) in recipe.types' :key="'A' + typeIndex">{{type}}</md-chip>
          </div>
      </div>
      <div class="md-layout-item md-xlarge-size-60 md-large-size-60 md-medium-size-60 md-small-size-100 md-xsmall-size-100">
        <div class='image-container'>
          <img v-if="!recipe.images"  src="http://placehold.jp/24/cccccc/ffffff/250x150.png?text=image" :alt="title + ' image'" onerror="this.onerror=null;this.src='http://placehold.jp/24/cccccc/ffffff/250x100.png?text=image';">
          <img v-else :src="recipe.images[counter]" :alt="recipe.images[counter] + 'image'">
        </div>
        <div v-if="recipe.images" class="control">
          <md-button @click="previous" class="md-icon-button md-primary">
          <md-icon>navigate_before</md-icon>
          </md-button>
          <md-button @click="next" class="md-icon-button md-primary">
            <md-icon>navigate_next</md-icon>
          </md-button>
        </div>
      </div>
    </section>
    <hr>
    <section class='md-layout lower-section'>
      <div class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-40 md-small-size-100 md-xsmall-size-100">
        <h3>Ingredients</h3>
          <div class='ingredients md-layout' v-for='(ingredient, ingredientIndex) in recipe.ingredients' :key="'B' + ingredientIndex">
            <md-icon class='md-accent md-layout-item md-xlarge-size-10 md-large-size-10 md-medium-size-10 md-small-size-10 md-xsmall-size-10'>shopping_basket</md-icon>
            <div class='md-accent md-layout-item md-xlarge-size-90 md-large-size-90 md-medium-size-90 md-small-size-90 md-xsmall-size-90'>{{ingredient}}</div>
          </div>
      </div>
        <div class="directions md-layout-item md-xlarge-size-60 md-large-size-60 md-medium-size-60 md-small-size-100 md-xsmall-size-100">
          <h3>Directions</h3>
            <div class='directions__items' v-for='(step, stepIndex) in recipe.recipeSteps' :key="'C' + stepIndex">
              <span class='md-title directions__items--title'>Step {{+stepIndex + 1}}</span>
              <div class='directions__items--method'>{{step.description}}</div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'default-no-footer',
  async asyncData({ $axios, params }) {
    console.log(params)
    const res = await $axios.$get(`https://share-your-recipe.firebaseio.com/recipes/${params.id}.json`)
    return { recipe: res }
  },
  head () {
    return {
      title: `${this.recipe.title}`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.recipe.title} general information, including ingredients, cooking directions, servings and timings` }
      ]
    }
  },
  data() {
    return {
      counter: 0,
    }
  },
  methods: {
    next() {
      this.counter++
      if (this.counter === this.recipe.images.length) {
        this.counter = 0
      } 
    },
    previous() {
      if (this.counter == 0) {
        this.counter = this.recipe.images.length-1
      } else {
        this.counter--
      }
    }
  },
  validate ({ params, store }) {
    return store.state.loadedRecipes.some((recipe) => recipe.id === params.id)
  }
}
</script>

<style lang='scss' scoped>

.upper-section {
  margin-top: 2rem;
}

.heading {
  background-color: rgba($color-primary, .1);
  margin: 2rem 0;
  height: 50rem;
  padding: 2rem;

  @include respond(tab-port) {
      height: auto;
  }

  &__title {
    text-align: center;
    // line-height: 3.2rem;
  }

  &__description {
    margin: 1rem auto;
    background-color: rgba($color-primary, .8);
    color: $color-white;
    width: 90%;
    text-align: center;
    padding: 2rem;

    @include respond(tab-port) {
      width: 80%;
    }

    @include respond(phone) {
      width: 90%;
    }
  }

  &__time-container {
    width: 70%;
    margin: 0 auto;

    @include respond(big-desktop) {
      width: 60%;
    }

    @include respond(tab-big) {
      width: 75%;
    }

    @include respond(tab-land) {
      width: 83%;
    }

    @include respond(tab-port) {
      width: 50%;
    }

    @include respond(phone) {
      width: 90%;
    }
  }

  &__time {

    &--prep {
      display: block;
      text-align: center;
      font-weight: 400;
    

      &__min {
        display: block;
        text-align: center;
        margin-top: -.5rem;
      }


    }
    
  }

}

.best-for {
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 1rem;

  &__items {
    text-align: center;

     &--chip {
       margin: .5rem;
     }
  }
}

.image-container {
  margin: 2rem 0 2rem 2rem;
  height: 50rem;
  overflow: hidden;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;

  @include respond(tab-port) {
    margin: 1rem 0;
  }

  img {
    width: 100%;
    height: 100%;
  }
}



.control {
  text-align: center;
  margin-bottom: .5rem;
}

.lower-section {
  margin-bottom: 2rem;
}

.ingredients {
  margin: 2rem 0;
}

.directions {
  padding-left: 2rem;

  @include respond(tab-port) {
    padding-left: 0;
    margin-bottom: 2rem;
  }

  &__items {
    margin: 2rem 0;

    &--title {
      text-transform: uppercase;
      color: $color-quaternary;
    }

  }
}


</style>
