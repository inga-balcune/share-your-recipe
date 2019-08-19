import axios from 'axios'
import Cookie from 'js-cookie'



export const state = () => {
    return {
      loadedRecipes: [],
      token: null,
      email: null,
      emailError: false,
      passwordError: false,
      passwordMissing: false,
      invalidEmail: false,
      emailNotFound: false
    }
  }

  export const mutations = {
    SET_RECIPES(state, recipes) {
        state.loadedRecipes = recipes
    },
    addRecipe(state, recipe) {
      state.loadedRecipes.push(recipe)
    },
    deleteRecipe(state, id) {
      const recipeIndex = state.loadedRecipes.findIndex(
        recipe => recipe.id === id
      )
      state.loadedRecipes.splice(recipeIndex, 1)
    },
    // create a token from the firebase
    setToken(state, token) {
      state.token = token
    },
    setEmail(state, email) {
      state.email = email
    },
    clearToken(state) {
      state.token = null
      state.email = null
    },
    setEmailError(state, emailError) {
      state.emailError = emailError
    },
    setPasswordError(state, passwordError) {
      state.passwordError = passwordError
    },
    setPasswordMissing(state, passwordMissing) {
      state.passwordMissing = passwordMissing
    },
    setInvalidEmail(state, invalidEmail) {
      state.invalidEmail = invalidEmail
    },
    setEmailNotFound(state, emailNotFound) {
      state.emailNotFound = emailNotFound
    },
  }

  // import API data 
  export const actions = {
    setRecipes(vuexContext) {
      vuexContext.commit('SET_RECIPES', recipes)
    },
    nuxtServerInit(vuexContext, context) {
      return axios.get('https://share-your-recipe.firebaseio.com/recipes.json')
                  .then(res => {
                      let recipesArray = []
                      for (const key in res.data ) {
                        recipesArray.push({...res.data[key], id: key})
                      }
                      vuexContext.commit('SET_RECIPES', recipesArray)
                  })
                  .catch(err => context.error(err))
    },
    addRecipe(vuexContext, recipe) {

      const createdRecipe = {
        ...recipe,
        updatedDate: new Date()
      }
      return this.$axios.$post(`https://share-your-recipe.firebaseio.com/recipes.json?auth=${vuexContext.state.token}`, createdRecipe)
      .then(data => {
        vuexContext.commit('addRecipe', {...createdRecipe, id: data.name})
        })
      .catch(e => this.$router.replace('/error'))
    },
    deleteRecipe(vuexContext, id) {
    //  return firebase.database().ref().child("recipes").child(id).remove() 
    return axios.delete(`https://share-your-recipe.firebaseio.com/recipes/${id}.json?auth=${vuexContext.state.token}`, { id: id })
      .then(response => {
        this.$router.go(0)
        vuexContext.commit('deleteRecipe', id) })
    },
    authenticateUser(vuexContext, authData) {
      let authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebaseAPIKey}`
      if (!authData.isLogin) {
        authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebaseAPIKey}`
      }
      return this.$axios
      // sign up with email and password
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
      
          .then(result => {
          // get secure token from firebase
            vuexContext.commit("setToken", result.idToken)
          // get email from firebase
            vuexContext.commit("setEmail", result.email)
          // store the token and email in the localStorage
            localStorage.setItem('token', result.idToken)
            localStorage.setItem('email', result.email)
          // store a time when token should expire
            localStorage.setItem('tokenExpiration', new Date().getTime() + +result.expiresIn * 1000)
          // set Cookie
            Cookie.set('jwt', result.idToken)
            Cookie.set('jwtEmail', result.email)
            Cookie.set('expirationTime', new Date().getTime() + +result.expiresIn * 1000)

          vuexContext.commit("setInvalidEmail", false)
          vuexContext.commit("setEmailError", false)
          vuexContext.commit("setPasswordError", false)
          vuexContext.commit("setPasswordMissing", false)
          })
      .catch(err => {
        if (err.response.data.error.message === 'EMAIL_EXISTS') {

          vuexContext.commit("setPasswordError", false)
          vuexContext.commit("setPasswordMissing", false)
          vuexContext.commit("setInvalidEmail", false)
          // if email exist then set to true and clear other variables
          vuexContext.commit("setEmailError", true)

        } else if (err.response.data.error.message === "INVALID_EMAIL" || err.response.data.error.message === "MISSING_EMAIL") {

          vuexContext.commit("setEmailError", false)
          vuexContext.commit("setPasswordError", false)
          vuexContext.commit("setPasswordMissing", false)
          // if invalid then set to true and clear other variables
          vuexContext.commit("setInvalidEmail", true)

        } else if (err.response.data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {

          vuexContext.commit("setPasswordMissing", false)
          vuexContext.commit("setInvalidEmail", false)
          vuexContext.commit("setEmailError", false)
          // if weak password then set to true and clear other variables
          vuexContext.commit("setPasswordError", true)

        } else if (err.response.data.error.message === "MISSING_PASSWORD" || err.response.data.error.message === "INVALID_PASSWORD") {

          vuexContext.commit("setInvalidEmail", false)
          vuexContext.commit("setEmailError", false)
          vuexContext.commit("setPasswordError", false)
          // if missing password then set to true and clear other variables
          vuexContext.commit("setPasswordMissing", true)
        } else if (err.response.data.error.message === "EMAIL_NOT_FOUND") {

          vuexContext.commit("setInvalidEmail", false)
          vuexContext.commit("setEmailError", false)
          vuexContext.commit("setPasswordError", false)
          vuexContext.commit("setPasswordMissing", false)
          // if email not found then set to true and clear other variables
          vuexContext.commit("setEmailNotFound", true)
        } else {
          this.$router.replace('/error')
        }
      })
    },
    // call this function in authenticateUser
    setLogoutTimer(vuexContext, duration) {
      setTimeout(() => {
        vuexContext.commit('clearToken')
      }, duration)
    },
    // check local storage and get token, it will be undefinied if there is no token otherwise the one we stored
    // dispatch it in middleware and call it whenever the middleware runs
    initializeAuth(vuexContext, request) {
      let token
      let email
      let expirationTime

      if (request) {
        if (!request.headers.cookie) {
          return
        }
        const jwtCookie = request.headers.cookie
                          .split(';')
                          .find(c => c.trim().startsWith("jwt="))
        if(!jwtCookie) {
          return
        } 
        token = jwtCookie.split('=')[1]

        const jwtCookieEmail = request.headers.cookie
                          .split(';')
                          .find(c => c.trim().startsWith("jwtEmail="))
        if(!jwtCookieEmail) {
          return
        } 
        email = jwtCookieEmail.split('=')[1]

        expirationTime = request.headers.cookie
                          .split(';')
                          .find(c => c.trim().startsWith("expirationTime="))
                          .split('=')[1]

      } else {
        token = localStorage.getItem('token')
        email = localStorage.getItem('email')
        expirationTime = localStorage.getItem('tokenExpiration')
      }
      // check if token has expired or we don't have a token
      // adding + in front of an variable converts it to a number from a string
      if (new Date().getTime() > +expirationTime || !token) {
        console.log('No token or invalid token')
        return vuexContext.dispatch('logout')
      }
      // set token
      vuexContext.commit('setToken', token)
      vuexContext.commit('setEmail', email)
    },
    logout(vuexContext) {
      vuexContext.commit('clearToken')
      Cookie.remove('jwt')
      Cookie.remove('jwtEmail')
      Cookie.remove('expirationTime')
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('tokenExpiration')
      }
    }
    
  }

  export const getters = {
    loadedRecipes: state => state.loadedRecipes,
    authRecipes: state => state.loadedRecipes.filter(recipe => recipe.email == state.email),
    isAuthenticated: state => {
      return state.token != null
    },
    isEmailError: state => state.emailError,
    isPasswordError: state => state.passwordError,
    isPasswordMissing: state => state.passwordMissing,
    isinvalidEmail: state => state.invalidEmail,
    isEmailNotFound: state => state.emailNotFound
    
  }  

  // vuex store gets innitialized on every new page refresh. When we refresh the page we execute a code on the server.