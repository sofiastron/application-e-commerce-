<template>
  <div class="tasklist">

    
    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Toutes</button>
      <button :class="{ active: filter === 'todo' }" @click="filter = 'todo'">À faire</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Terminées</button>
    </div>

    <p><strong>Total tâches :</strong> {{ totalTasks }}</p>

    
    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <div class="task-info">
          <h3 :class="{ completed: task.completed }">{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>

        <div class="task-actions">
          <button v-if="!task.completed" @click="markCompleted(task.id)">
            Terminer
          </button>
          <span v-else class="done">✔ Terminée</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const tasks = ref([]);
    const filter = ref("all");

    const loadTasks = async () => {
      const response = await fetch("/tasks.json");
      tasks.value = await response.json();
    };

    const markCompleted = (id) => {
      const t = tasks.value.find(task => task.id === id);
      if (t) t.completed = true;
    };

    const totalTasks = computed(() => tasks.value.length);

    const filteredTasks = computed(() => {
      if (filter.value === "todo") return tasks.value.filter(t => !t.completed);
      if (filter.value === "done") return tasks.value.filter(t => t.completed);
      return tasks.value;
    });

    onMounted(loadTasks);

    return { tasks, filter, markCompleted, totalTasks, filteredTasks };
  }
};
</script>

<style scoped>
.tasklist {
  background: #ffffff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  margin-top: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Segoe UI', sans-serif;
}


.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.filters button {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: #f0f2f7;
  cursor: pointer;
  font-weight: 500;
  transition: 0.25s;
}

.filters button:hover {
  background: #dbe1f0;
}

.filters .active {
  background: #1f3c88;
  color: white;
  font-weight: 600;
}


ul {
  list-style: none;
  margin-top: 12px;
  padding: 0;
}

li {
  padding: 14px 12px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.task-info h3 {
  margin-bottom: 4px;
  font-size: 1.1rem;
}

.completed {
  text-decoration: line-through;
  color: #a0a0a0;
}

.task-actions button {
  padding: 6px 14px;
  border: none;
  background: #4f8cff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s;
  font-size: 0.9rem;
}

.task-actions button:hover {
  background: #306ee0;
}

.done {
  font-weight: 600;
  color: #1aa155;
  font-size: 0.95rem;
}
</style>


