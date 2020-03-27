<template>
  <div id='app'>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" :to="{'name': 'Home'}">&#x1F440 <!-- Eyes Emoji --></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" to='/about'>About</b-nav-item>
          <b-nav-item href="#" to='/404'>Not Found</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <GoogleLogin v-if="!isSignedIn" class="ml-auto" :params="getClientId" :renderParams="renderParams" :onSuccess="onSignIn" :onFailure="onFailure"></GoogleLogin>
        <b-navbar-nav v-else class="ml-auto">
          <b-img :src="imageURL" fluid rounded="circle"/>
          <b-nav-item-dropdown right :text="username" >

            <!--
            <template v-slot:button-content>
              {{ username }} <b-img fluid :src="imageURL" rounded="circle" class="w-25"/>
            </template>
          -->
            <!-- Using 'button-content' slot -->
            <!-- <template v-slot:button-content>{{ username }}</template> -->
            <b-dropdown-item @click="signOut();">Sign-out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import Vue from 'vue'
import { LoaderPlugin } from 'vue-google-login';
import { mapGetters, mapActions } from 'vuex'
import { store } from '../store'
Vue.use(LoaderPlugin, {client_id: '282176905151-ul8cu4nsahkd83nsahjar0am52dlop64.apps.googleusercontent.com'});

export default {
  name: 'Navbar',
  data () {
    return {
      username: "AP",
      imageURL: "",
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    GoogleLogin
  },
  mounted() {
    Vue.GoogleAuth.then(auth2 => {
        if(auth2.isSignedIn.get()){
          this.$store.dispatch('setSignedIn', true)
          this.onSignIn(auth2.currentUser.s3.value);
        }
    })
  },
  methods: {
    onSignIn (user) {
      var profile = user.getBasicProfile()
      this.$store.dispatch('setSignedIn', true)
      console.log(user.getAuthResponse().id_token)
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      this.username = profile.getName();
      this.imageURL = profile.getImageUrl();
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      this.$store.dispatch('setSignedIn', false)
      this.imageURL = "";
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
    onFailure(){
      console.log("Failed to login to google");
    }
  },
  computed: {
    ...mapGetters(['isSignedIn', 'getClientId']),
    ...mapActions(['setSignedIn'])
  }
}
</script>
