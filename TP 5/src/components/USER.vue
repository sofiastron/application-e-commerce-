<template>
  <div class="container">

    <!-- Titre -->
    <h1 class="title">Liste des Emplois</h1>

    <!-- Barre de recherche -->
    <FilterNav @filter-change="updateFilters" />

   

    <!-- Liste des emplois -->
    <div class="job-list">
      <div v-for="job in filteredJobs" :key="job.id" class="job-card">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p><strong>Salaire :</strong> {{ job.salary }} DH</p>
        <p><strong>Expérience :</strong> {{ job.experience }} ans</p>

        <div class="btn-group">
          <button @click="router.push(`/job/${job.id}`)">Détails</button>
          
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import FilterNav from '../components/FilterNav.vue'

const router = useRouter()
const jobs = ref([])

// Filtres reçus depuis FilterNav
const filters = ref({
  title: '',
  minSalary: null,
  minExperience: null
})

const updateFilters = (newFilters) => {
  filters.value = newFilters
}

const fetchJobs = async () => {
  const res = await fetch('http://localhost:3000/jobs')
  jobs.value = await res.json()
}
onMounted(fetchJobs)

// Filtrage
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    return (
      (filters.value.title === '' || job.title.toLowerCase().includes(filters.value.title.toLowerCase())) &&
      (filters.value.minSalary === null || job.salary >= filters.value.minSalary) &&
      (filters.value.minExperience === null || job.experience >= filters.value.minExperience)
    )
  })
})



</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 26px;
  font-weight: bold;
}



/* Liste */
.job-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

/* Carte */
.job-card {
  background: white;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.job-card h3 {
  margin-top: 0;
}

/* Buttons */
.btn-group button {
  margin-right: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.delete {
  background: rgb(37, 99, 235);
  color: white;
}
.delete:hover {
  background:rgb(37, 99, 235);
}
</style>


