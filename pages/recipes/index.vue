<template>
  <div class='recipes-section'>
    <section>
      <h2>Find a recipe you'll love</h2>
    </section>
    <div class='md-layout md-gutter md-alignment-center my-button-container'>
      <p class='md-layout-item md-xsmall-size-100 filter-by'>Filter by:</p>
      <md-button class="button md-layout-item md-xsmall-size-100 md-raised md-accent show-all" @click="filterByCousine('all')">Show all</md-button>
      <md-button class='button md-layout-item md-xsmall-size-100' @click='onCousineFilter'>Cuisine</md-button>
      <md-button class='button md-layout-item md-xsmall-size-100' @click='onMealTypeFilter'>Meal Type</md-button>
    </div>
    <div v-if='filterCuisine' class='filter-by-cousine-type'>
      <md-button class="md-accent" v-for='(cuisine, cuisineIndex) in cuisines' :key="'A ' + cuisineIndex" @click="filterByCousine(cuisine)">{{cuisine}}</md-button>
    </div>
    <div v-if='filterType' class='filter-by-cousine-type'>
      <md-button class="md-accent" v-for='(mealType, mealTypeIndex) in mealTypes' :key="'B ' + mealTypeIndex" @click="filterByType(mealType)">{{mealType}}</md-button>
    </div>
    <div class='my-searchbar-container'>
      <md-field>
        <label class='my-searchbar-label'>Type to search for a title, ingredient, meal type or cuisine!!</label>
        <md-input v-model="searchText" @input='filterBySearchText(searchText)'></md-input>
      </md-field>
    </div>
    <AppRecipeList :recipes='filteredRecipes'/>
    <md-empty-state
          v-if='filteredRecipes.length < 1'
          md-rounded
          md-icon="notification_important"
          md-label="Nothing in this category"
          md-description="Search or filter by another category to see available recipes.">
    </md-empty-state>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  layout: 'default-no-footer',
  head () {
    return {
      title: 'All available recipes of Share Your Recipe',
      meta: [
        { hid: 'description', name: 'description', content: "Filter and search for a recipe you'll love" }
      ]
    }
  },
  data() {
    return {
      cuisines: ['Italian', 'Mexican', 'Western', 'Carribean', 'Chinese', 'French', 'Japanse', 'Mediterranean', 'Thai', 'Greek', 'Turkish', 'Vietnamese', 'Other'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Vegetarian', 'Vegan'],
      filteredRecipes: [],
      filterCuisine: false,
      filterType: false,
      searchText: ''
    }
  },
  computed: { 
    ...mapGetters([
        'loadedRecipes',
    ]),
  },
  methods: {
    filterByCousine(cuisine) {
      if (cuisine === 'all') {
        this.filterCuisine = false
        this.filterType = false
        this.filteredRecipes = this.loadedRecipes
      } else {
        this.filteredRecipes = this.loadedRecipes.filter(recipe => recipe.cuisine.includes(cuisine))
        this.filterCuisine = false
      }
    },
    onCousineFilter() {
      this.filterCuisine = !this.filterCuisine
      this.filterType = false
    },
    onMealTypeFilter() {
      this.filterType = !this.filterType
      this.filterCuisine = false
    },
    filterByType(type) {
        this.filteredRecipes = this.loadedRecipes.filter(recipe => recipe.types.includes(type))
        this.filterType = false
    },
    filterBySearchText(text) {
      this.filterCuisine = false
      this.filterType = false
      this.filteredRecipes = this.loadedRecipes.filter(recipe => recipe.title.toLowerCase().includes(text.toLowerCase()) || recipe.cuisine.toLowerCase().includes(text.toLowerCase()) || 
      recipe.ingredients.some(ingr => ingr.toLowerCase().includes(text.toLowerCase())) || recipe.types.some(ingr => ingr.toLowerCase().includes(text.toLowerCase())))
    }
  },
  mounted() {
    this.filterByCousine('all')
  }


 
}
</script>

<style lang='scss' scoped>

.recipes-section {
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
}

.my-button-container {
  width: 50%;
  margin: 1rem auto;

  @include respond(tab-land) {
    width: 50%;
  }

  @include respond(tab-port) {
    width: 70%;
  }

  @include respond(phone) {
    width: 100%;
  }
}

.my-searchbar-label {
  @include respond(tab-port) {
    font-size: 1.5rem;
  }

  @include respond(phone) {
    font-size: 1.4rem;
  }
}

.button {
  font-size: 1.7rem;
}


.my-searchbar-container {
  width: 40%;
  margin: 1rem auto;

   @include respond(tab-land) {
    width: 50%;
  }

  @include respond(tab-port) {
    width: 70%;
  }

  @include respond(phone) {
    width: 100%;
  }
}

.filter-by {
  min-width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .8rem;
  text-transform: uppercase;
  font-size: 1.8rem;
  font-weight: 500;

}

.filter-by-cousine-type {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  // padding: 0 .8rem;
}


</style>
