<template>
  <div>
    <md-empty-state
      md-icon="fastfood"
      md-label="Create your first recipe"
      md-description="Creating recipe, you'll be able to add description, ingredients, preperation directions and upload images.">
      <md-button @click="$router.replace('/admin/new-post')" class="md-primary md-raised">Create first recipe</md-button>
    </md-empty-state>
  </div>
</template>

<script>
  export default {
    name: 'EmptyStateBasic'
  }
</script>

<style scoped>

</style>
