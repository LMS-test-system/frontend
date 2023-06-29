import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/teacher',
          name: 'teacher',
          component: () => import('../views/Teacher/Teacher.vue')
        },
        {
          path: '/about_teacher',
          name: 'aboutteacher',
          component: () => import('../views/Teacher/AboutTeacher.vue')
        },
        {
          path: '/student',
          name: 'student',
          component: () => import('../views/Student/Student.vue')
        },
        {
          path: '/about_student',
          name: 'aboutstudent',
          component: () => import('../views/Student/AboutStudent.vue')
        },
        {
          path: '/science',
          name: 'science',
          component: () => import('../views/Science/Science.vue')
        },
        {
          path: '/about_science',
          name: 'aboutscience',
          component: () => import('../views/Science/AboutScience.vue')
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error/Error.vue')
    }
  ]
})



export default router
