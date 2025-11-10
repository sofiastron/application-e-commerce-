<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/login">LOGIN</router-link>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.navbar {
  background: linear-gradient(90deg, #2563eb, #38bdf8);
  padding: 14px 24px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.05rem;
  transition: color 0.2s, transform 0.2s;
}

.navbar a:hover {
  color: #e0f2fe;
  transform: translateY(-2px);
}

main {
  padding: 2rem;
}
</style>

<style>
body {
  font-family: "Poppins", Arial, sans-serif;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  margin: 0;
  padding: 0;
  color: #1e293b;
}

button {
  background: linear-gradient(90deg, #2563eb, #38bdf8);
  border: none;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

button:hover {
  background: linear-gradient(90deg, #1d4ed8, #0ea5e9);
  transform: scale(1.05);
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3);
}
</style>

