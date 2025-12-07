<template>
   <div id="app">
     <h1>Event App</h1>
     <nav v-if="user">
      <router-link to="/home">home</router-link>
      <router-link to="/">auth</router-link>
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