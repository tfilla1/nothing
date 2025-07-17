import { RouteRecordRaw, createMemoryHistory, createRouter } from 'vue-router'

import defaultLayout from '@/layouts/default.vue'
// import ChatView from '@/pages/chat/index.vue'
import GameView from '@/pages/games/index.vue'
import HomeView from '@/pages/index.vue'
// import TodoView from '@/pages/todos/index.vue'
// import UserView from '@/pages/users/index.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description?: string
    exact?: boolean
    nav?: boolean
    icon?: string
    requiresAuth?: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: defaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: 'Home', requiresAuth: false, nav: true, icon: '$home', exact: true, },
        component: HomeView
      },
      {
        path: 'games',
        name: 'games',
        meta: { title: 'Games', requiresAuth: false, nav: true, icon: '$games', exact: true, },
        component: GameView
      },
      // {
      //   path: 'todo',
      //   name: 'todo',
      //   meta: { title: 'To Do', requiresAuth: false, nav: true, icon: '$todo', exact: true, },
      //   component: TodoView
      // },
      // {
      //   path: 'users',
      //   name: 'users',
      //   meta: { title: 'Users', requiresAuth: false, nav: true, icon: '$users', exact: true, },
      //   component: UserView
      // },
      // {
      //   path: 'chat',
      //   name: 'chat',
      //   meta: { title: 'Chat', requiresAuth: false, nav: true, icon: '$chat', exact: true, },
      //   component: ChatView
      // },
    ]
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
