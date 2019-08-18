<template>
  <div class="centered-container">
    <form novalidate class="md-layout" @submit.prevent="auth">
      <md-content class="md-elevation-3">

        <div class="title">
          <div class="md-title" v-if='isLogin'>Login</div>
          <div class="md-title" v-if='!isLogin'>Sign Up</div>
          <div class="md-body-1">Share your favorite recipes</div>
        </div>

        <div class="form">

          <md-field :class="[isEmailError ? 'md-invalid' : '', isinvalidEmail ? 'md-invalid' : '', isEmailNotFound ? 'md-invalid' : '']">
            <label>E-mail</label>
            <md-input v-model="email" autofocus type="email"></md-input>
            <span v-if='isEmailError' class="md-error">The email is taken</span>
            <span v-if='isEmailNotFound' class="md-error">Please add valid email address</span>
            <span v-if='isinvalidEmail' class="md-error">Please add email address</span>
            <span v-else class="md-error">The email is invalid</span>
          </md-field>

          <md-field md-has-password :class="[isPasswordError ? 'md-invalid' : '', isPasswordMissing ? 'md-invalid' : '']">
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
            <span class="md-error">Weak password, should be at least 6 characters</span>
          </md-field>
        </div>

        <div class="actions md-layout md-alignment-center-space-between">
          <md-button type='submit' class="md-raised md-primary">{{isLogin ? 'Login' : 'Sign up'}}</md-button>
          <md-button type='button' class="md-primary" @click="isLogin = !isLogin">Switch to {{isLogin ? 'Sign up' : 'Login' }}</md-button>
        </div>

        <div class="loading-overlay" v-if="loading">
          <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
        </div>

      </md-content>
      <div class="background" />
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "LoginPage",
  layout: 'default-no-footer',
  head () {
    return {
      title: 'Login and Sign Up page of the Share Your Recipe',
      meta: [
        { hid: 'description', name: 'description', content: 'Sign up or Login to access your recipes, crate a new recipe, and edit your recipes.' }
      ]
    }
  },
  data() {
    return {
      loading: false,
      isLogin: false,
      email: "",
      password: ""
    }
  },
  methods: {
    auth() {
      this.loading = true
      this.$store.dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
      })
      .then(() => {
        this.loading = false
        this.$router.replace('/admin')
      })
    }
  },
  computed: {
    ...mapGetters([
        'isEmailError',
        'isPasswordError',
        'isPasswordMissing',
        'isinvalidEmail',
        'isEmailNotFound'
    ])
 },
};
</script>

<style lang="scss">

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;

  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: .5rem;

      @include respond(phone) {
        width: 100%;
      }
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>