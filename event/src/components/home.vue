<template>
  <div style="padding: 20px;">
    <h2>Home</h2>
    <p v-if="!user">Pas connecté</p>

    <div v-else>
      <p>Bienvenue : {{ user.email }}</p>
      <button @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../services/authService";

export default {
  data() {
    return { user: null };
  },
  mounted() {
    onAuthStateChanged(auth, u => {
      this.user = u;
    })
  },
  methods: {
    async logoutUser() {
      await logout();
    }
  }
}
</script>
