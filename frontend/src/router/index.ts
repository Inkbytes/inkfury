import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/profiles/Profile.vue'
import Game from '../views/gamePage.vue'
import Chat from '../views/chat.vue'
import Users from '../views/profiles/Users.vue'
import Games from '../views/games.vue'
import spectateGame from '../views/spectateGame.vue'
import customGame from '../views/customgamePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/profile/:login',
    name: 'Users',
    component: Users,
    props: true
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/games',
    name: 'Games',
    component: Games
  },
  {
    path: '/watch/:id',
    name: 'spectateGame',
    component: spectateGame,
    props: true
  },
  {
	  path: '/custom-game/:gameid',
	  name: 'customGame',
	  component: customGame,
	  props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
