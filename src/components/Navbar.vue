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

        <div v-if="!signedIn" id="google-signin-button" class="ml-auto"></div>
        <b-navbar-nav v-if="signedIn" class="ml-auto">
          <b-nav-item-dropdown right :text="username">
            <template v-slot:button-content>
              {{ username }} <b-img fluid :src="imageURL" rounded="circle" class="w-25"/>
            </template>
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

export default {
  name: 'Navbar',
  data () {
    return {
      signedIn: false,
      username: "AP",
      imageURL: ""
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    onSignIn (user) {
      var profile = user.getBasicProfile()
      this.signedIn = true;
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      this.username = profile.getName();
      this.imageURL = profile.getImageUrl();
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      this.signedIn = false;
      this.imageURL = "";
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }
  }
}
</script>
