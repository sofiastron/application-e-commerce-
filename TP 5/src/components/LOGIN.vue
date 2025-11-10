<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <input v-model="username" placeholder="Entrez un nom (admin ou user)" />
    <button @click="login">Se connecter</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const error = ref('')

function login() {
  if (username.value.toLowerCase() === 'admin') {
    router.push('/')
  } else if (username.value.toLowerCase() === 'user') {
    router.push('/user')
  } else {
    error.value = 'Utilisateur inconnu. Tapez "admin" ou "user".'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 350px;
  margin: 100px auto;
  background: #f9fafb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #1e40af;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
