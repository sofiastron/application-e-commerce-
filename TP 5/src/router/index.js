import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import AddJob from '../components/AddJob.vue'
import EditJob from '../components/EditJob.vue'
import JobDetail from '../components/JobDetail.vue'
import USER from '../components/USER.vue'
import LOGIN from '../components/LOGIN.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AddJob },
  { path: '/edit/:id', component: EditJob, props: true },
  { path: '/user', component: USER },
   { path: '/login', component: LOGIN },
  { path: '/job/:id', component: JobDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
