<template>
  <div>
    <form novalidate class="form md-layout md-alignment-center" @submit.prevent='validateRecipe' v-on:keydown.enter.prevent>
      <md-card class="md-layout-item md-size-75 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create a recipe</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="recipe-title">Title</label>
                <md-input name="recipe-title" id="recipe-title" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cuisine')">
                <label for="cuisine">Cuisine</label>
                <md-select :name="form.cuisine" :id="form.cuisine" v-model="form.cuisine" md-dense :disabled="sending">
                  <md-option value="" disabled selected></md-option>
                  <md-option v-for="(cuisine, cuisineIndex) in cuisines" :value="cuisine" :key="'A' + cuisineIndex">{{cuisine}}</md-option>
                </md-select>
                <span class="md-error">The cuisine is required</span>
              </md-field>
            </div>
          </div>

            <span class="types-error md-error" v-if="!$v.form.types.required">Choose the meal types</span>
            <div class="md-layout md-gutter">
              <md-checkbox 
                          class="md-primary md-layout-item md-large-size-20 md-xsmall-size-35" 
                          v-model="form.types" 
                          v-for="(mealType, mealTypeIndex) in mealTypes" 
                          :key="'B' + mealTypeIndex" 
                          :value="mealType">
                  {{mealType}}
              </md-checkbox>
            </div>
            


          <span>
            <div class="md-subheading">Description</div>
            <span class="md-caption">Add a short description, between 30 and 300 characters long</span>
          </span>
          <md-field :class="getValidationClass('description')">
            <label for="description">Your description</label>
            <md-textarea type="description" name="description" id="description" v-model="form.description" md-counter="300" :disabled="sending"></md-textarea>
            <span class="md-error" v-if="!$v.form.description.required">Description is required</span>
            <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description length</span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('prep')">
                <label for="prep">Preperation time</label>
                <md-input type="number" id="prep" name="prep" v-model="form.prep" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.prep.required">The preperation time is required</span>
                <span class="md-error" v-else-if="!$v.form.prep.maxlength">Invalid preperation time</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('cook')">
                <label for="cook">Cooking time</label>
                <md-input type="number" id="cook" name="cook" v-model="form.cook" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.cook.required">The cooking time is required</span>
                <span class="md-error" v-else-if="!$v.form.cook.maxlength">Invalid cooking time</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('servings')">
                <label for="servings">Number of servings</label>
                <md-input type="number" id="servings" name="servings" v-model="form.servings" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.servings.required">The number of servings is required</span>
                <span class="md-error" v-else-if="!$v.form.servings.maxlength">Invalid servings count</span>
              </md-field>
            </div>

          </div>

          <!-- <md-field class="md-layout-item md-small-size-100" :class="getValidationClass('ingredients')">
            <label for="ingredients">Ingredients</label>
              <md-input type="ingredients" name="ingredients" id="ingredients" v-model.trim="newIngredient" :disabled="sending"/>
              <md-button class="md-primary" @click="addIngredient">Add</md-button>
            <span class="md-error" v-if="!$v.form.ingredients.required">The ingredients is required</span>
            <span class="md-error" v-else-if="!$v.form.ingredients">Invalid ingredients</span>
          </md-field> -->
          
          <div class="md-layout-item md-small-size-100">
            <span class="md-error" v-if="!$v.form.ingredients.required">The ingredients are required</span>
            <md-chips class="md-primary shake-on-error" v-model="form.ingredients" md-placeholder="*Add an ingredient..."></md-chips>
         </div>

          <!-- <md-list> 
            <md-list-item v-for="(ingredient, index) in form.ingredients" :key='index'>
              <span @click="removeIngredient(index)"><md-icon class='delete-hover-class'>delete_forever</md-icon></span>
              <span class="md-list-item-text">{{ingredient}}</span>
            </md-list-item>
          </md-list> -->

          <span>
            <div class="md-subheading">Directions</div>
            <span class="md-caption">Add each step in a new text field, to add extra text field click on "+" icon</span>
          </span>
          <md-field v-for="(step, stepIndex) in form.recipeSteps" :key="'C' + stepIndex" :class="getValidationClass('recipeMethod')">
            <label for="recipeMethod">Your directions (required)</label>
            <md-textarea type="recipeMethod" name="recipeMethod" id="recipeMethod" v-model.trim="step.description" :disabled="sending" required></md-textarea>
            <span class='icon-wrapper'>
              <span @click="removeRecipeStep(stepIndex)" v-show="stepIndex || ( !stepIndex && form.recipeSteps.length > 1)"><md-icon class='delete-hover-class'>remove_circle_outline</md-icon></span>
              <span @click="addRecipeStep(stepIndex)" v-show="stepIndex == form.recipeSteps.length-1"><md-icon class='delete-hover-class'>add_circle_outline</md-icon></span>
            </span> 
            
          </md-field>

          <span>
            <div class="md-subheading">Images</div>
            <span class="md-caption">Add URL image link for each photo in a seperate input field</span>
          </span>
          <md-field class="md-layout-item md-small-size-100">
            <label for="images">Image Link</label>
              <md-input type="images" name="images" id="images" v-model.trim="newImage" :disabled="sending"/>
              <md-button class="md-primary" @click="addImage">Add</md-button>
          </md-field>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-xlarge-size-12.5 md-large-size-20 md-xsmall-size-30" v-for="(image, imageIndex) in form.images" :key="'D' + imageIndex">
                <!-- <span class="md-list-item-text">{{image}}</span> -->
                <img class='images' :src="image" :alt="form.title + ' recipe image #' + imageIndex + 1">
                <span @click="removeImage(imageIndex)"><md-icon class='image-delete-icon delete-hover-class md-accent'>delete_forever</md-icon></span>
              </div>
            </div>

          <md-field class="md-layout-item md-small-size-100">
            <label for="thumbnail">Thumbnail Link</label>
              <md-input type="thumbnail" name="thumbnail" id="thumbnail" v-model.trim="form.thumbnail" :disabled="sending"/>
          </md-field>
          
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button class="md-primary" @click="onCancel" :disabled="sending">Cancel</md-button>
          <md-button type="submit" class="md-primary" v-bind='$attrs' v-on='$listeners' @click.prevent="validateRecipe" :disabled="sending">Save recipe</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="recipeSaved">Your recipe was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  // import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    // mixins: [validationMixin],
    props: {
      recipe: {
        type: Object,
        required: false
      },
      sending: {
        type: Boolean,
        required: false
      },
      email: {
        required: true
      }
    },
    data() {
      return {
        form: this.recipe ? {...this.recipe} : {
          email: this.email,
          title: null,
          types: [],
          cuisine: null,
          prep: null,
          cook: null,
          servings: null,
          images: [],
          thumbnail: null,
          description: null,
          ingredients: [],
          recipeSteps: [{
                  description: ''
              }]
        },
        cuisines: ['Italian', 'Mexican', 'Western', 'Carribean', 'Chinese', 'French', 'Japanse', 'Mediterranean', 'Thai', 'Greek', 'Turkish', 'Vietnamese', 'Other'],
        mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Vegetarian', 'Vegan'],
        newIngredient: '',
        newImage: '',
        recipeSaved: false,
    }
  },
    validations: {
      form: {
        title: {
          required,
          minLength: minLength(3)
        },
        prep: {
          required,
          maxLength: maxLength(3)
        },
        cook: {
          required,
          maxLength: maxLength(3)
        },
        servings: {
          required,
          maxLength: maxLength(2)
        },
        description: {
          required,
          minLength: minLength(30),
          maxLength: maxLength(300)
        },
        types: {
          required
        },
        cuisine: {
          required
        },
        ingredients: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      addIngredient() {
        var value = this.newIngredient
        if (!value) {
          return
        }
        this.form.ingredients.push(this.newIngredient)
        this.newIngredient = ''
      },
      removeIngredient(index) {
        this.$delete(this.form.ingredients, index)
      },
      addImage() {
        var value = this.newImage
        if (!value) {
          return
        }
        this.form.images.push(this.newImage)
        this.newImage = ''
      },
      removeImage(index) {
        this.$delete(this.form.images, index)
      },
      addRecipeStep(index) {
            this.form.recipeSteps.push({ description: '' })
      },
      removeRecipeStep(index) {
            this.form.recipeSteps.splice(index, 1)
      },
      saveRecipe () {
        this.$emit('submit', this.form)
      },
      onCancel() {
        this.$router.push('/admin')
      },
      validateRecipe () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveRecipe()
          this.recipeSaved = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .form {
    margin: 2rem auto 3rem auto;
  }

  .types-error {
    display: block;
  }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .add-button {
    width: 10rem;
  }

  .image-delete-icon {
    width: 100%;
    text-align: center;
    margin: .5rem auto;
  }

  .delete-hover-class {
    margin-right: .5rem;
     
     &:hover {
       background-color: gainsboro;
       cursor: pointer;
     }
  }

  

  // .icon-wrapper {
  //   margin-right: 2rem;
  // }

  .shake-on-error /deep/ .md-duplicated {
    animation-name: shake;
    animation-duration: 0.5s;
  }

  @keyframes shake {
    0% { transform: translate(15px); }
    20% { transform: translate(-15px); }
    40% { transform: translate(7px); }
    60% { transform: translate(-7px); }
    80% { transform: translate(3px); }
    100% { transform: translate(0px); }
  }

</style>
