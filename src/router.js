import { createRouter, createWebHistory } from 'vue-router'
import StrategicPlanDashboard from './components/strategic-plan/StrategicPlanDashboard.vue'
import SimpleLayout from './layouts/simple/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SimpleLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: StrategicPlanDashboard
        }
      ]
    },
    {
      path: '/strategic-plan/',
      redirect: '/'
    }
  ]
})

export default router 
