<template>
  <div id="app">
    <Navbar/>
    <div id='content'>
      <img src="./assets/logo.png">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  },
  data () {
    return {
      msg: '404: Not Found!'
    }
  }
}
</script>

<style>
#content {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
