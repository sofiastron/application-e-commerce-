<template>
   <div id="app">
     <h1>Event App</h1>
     <nav v-if="user">
      <router-link to="/home">home</router-link>
      
     </nav>
     <main>
      <router-view></router-view>
     </main>
     <footer>
       <p>&copy; 2025 Event App</p>
     </footer>
   </div>
</template>
<script>
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    onAuthStateChanged(auth, u => {
      this.user = u;
    });
  }
};
</script>
<style>

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}

</style>