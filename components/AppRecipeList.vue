<template>
  <div>
    <section class="md-layout md-gutter md-alignment-left" :class="{ 'md-alignment-center': recipes.length > 3 }">
      <AppRecipeCard class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100" 
      v-for='recipe in recipes' :key='recipe.id'
      :id='recipe.id'
      :is-admin='isAdmin'
      :title='recipe.title'
      :description='recipe.description'
      :thumbnail='recipe.thumbnail'/>
    </section>

    
  </div>
</template>

<script>
export default {
 name: 'RecipeList',
 props: {
   isAdmin: {
     type: Boolean,
     default: false
   },
   recipes: {
     type: Array,
     required: true
   }
 }
}
</script>

<style lang='scss' scoped>

.md-layout-item {
    margin-top: .8rem;
    margin-bottom: .8rem;
    // transition: .3s $md-transition-stand-timing;

    &:after {
      width: 100%;
      height: 100%;
      display: block;
      // background: md-get-palette-color(purple, 200);
      content: " ";
    }
  }

</style>
