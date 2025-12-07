<template>
  <div style="padding: 20px;">
    <h2>Home</h2>
    <p v-if="!user">Pas connecté</p>

    <div v-else>
      <p>Bienvenue : {{ user.email }}</p>

      <h1>Events ENSA Safi</h1>
      <div v-for="event in events" :key="event.id" class="card">
        <img :src="event.img" width="400" />
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>Date : {{ event.date }}</p>
        <p>Yes: {{ event.yesVotes }}</p>
        <p>No: {{ event.noVotes }}</p>
      </div>
      
      <button @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../services/authService";

export default {
  data() {
    return {
      user: null,
      events: []
    };
  },
  mounted() {
    onAuthStateChanged(auth, async (u) => {
      this.user = u;
      if (u) {
        await this.fetchEvents(); // Appel pour récupérer les events
      }
    });
  },
  methods: {
    async logoutUser() {
      await logout();
    },
    async fetchEvents() {
      const querySnapshot = await getDocs(collection(db, "Events"));
      this.events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
    }
  }
};
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.card img {
  display: block;
  margin-bottom: 10px;
}
.card h3 {
  margin: 0 0 10px 0;
}
.card p {
  margin: 5px 0;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

</style>