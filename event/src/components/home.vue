<template>
  <div style="padding: 20px;">
    <h2>Home</h2>
    <p v-if="!user">Pas connecté</p>

    <div v-else>
      <p>Bienvenue : {{ user.email }}</p>

      <h1>Events ENSA Safi</h1>
      <div v-for="event in events" :key="event.id" class="card" style="margin-bottom: 20px;">
        <img :src="event.img" width="400" />
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p>Date : {{ event.date }}</p>

        <p>Yes: {{ event.yesVotes }}</p>
        <p>No: {{ event.noVotes }}</p>

        <div>
          <button 
            @click="vote(event.id, 'yes')" 
            :disabled="hasVoted(event.id)">
            Vote Yes
          </button>
          <button 
            @click="vote(event.id, 'no')" 
            :disabled="hasVoted(event.id)">
            Vote No
          </button>
        </div>
      </div>

      <button @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase";
import { collection, onSnapshot, doc, addDoc, getDocs, query, where, updateDoc, increment } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../services/authService";

export default {
  data() {
    return {
      user: null,
      events: [],
      userVotes: {} //  eventId: 'yes' ou 'no' 
    };
  },
  mounted() {
    onAuthStateChanged(auth, async (u) => {
      this.user = u;
      if (u) await this.loadUserVotes();

     
      const eventsRef = collection(db, "Events");
      onSnapshot(eventsRef, (snapshot) => {
        this.events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      });
    });
  },
  methods: {
    async logoutUser() {
      await logout();
    },

    async loadUserVotes() {
      if (!this.user) return;
      const votesRef = collection(db, "Votes");
      const q = query(votesRef, where("userId", "==", this.user.uid));
      const voteDocs = await getDocs(q);
      voteDocs.forEach(doc => {
        this.userVotes[doc.data().eventId] = doc.data().vote;
      });
    },

    hasVoted(eventId) {
      return !!this.userVotes[eventId];
    },

    async vote(eventId, voteType) {
      if (!this.user) return;

      const votesRef = collection(db, "Votes");

      
      const q = query(votesRef, where("eventId", "==", eventId), where("userId", "==", this.user.uid));
      const existingVote = await getDocs(q);
      if (!existingVote.empty) {
        alert("Vous avez déjà voté pour cet événement !");
        return;
      }

      
      await addDoc(votesRef, {
        eventId,
        userId: this.user.uid,
        vote: voteType,
        createdAt: new Date()
      });

      
      const eventRef = doc(db, "Events", eventId);
      if (voteType === "yes") await updateDoc(eventRef, { yesVotes: increment(1) });
      else await updateDoc(eventRef, { noVotes: increment(1) });

      
      this.userVotes[eventId] = voteType;
    }
  }
};
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
}
button {
  margin-right: 10px;
}
</style>
