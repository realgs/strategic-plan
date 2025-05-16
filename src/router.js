import { createRouter, createWebHistory } from 'vue-router'
import StrategicPlanDashboard from './components/strategic-plan/StrategicPlanDashboard.vue'

const router = createRouter({
  history: createWebHistory('/strategic-plan/'),
  routes: [
    {
      path: '/',
      component: StrategicPlanDashboard
    }
  ]
})

export default router 
