
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700,400italic|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~/plugins/Vuelidate',
    { src: '~/plugins/vue-material' },
    '~/plugins/axios',
    '~/plugins/UUID',
    '~/plugins/firebase'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@bazzite/nuxt-optimized-images',
  ],
  optimizedImages: {
    optimizeImages: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASEURL || 'https://share-your-recipe.firebaseio.com/'
  },

  styleResources: {
    scss: [
      'assets/sass/abstracts/_functions.scss',
      'assets/sass/abstracts/_mixins.scss',
      'assets/sass/abstracts/_variables.scss' // use underscore "_" & also file extension ".scss"
      ]
  },
  env: {
    firebaseAPIKey: 'AIzaSyAl5iJAnHm3G6HKxmkkJ-XHLrNF2KRPjKU'
  },
  /*
  ** Build configuration
  */

  build: {
    // vendor: ['vue-material'],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    
    extend(config, ctx) {
    }
  }
}
