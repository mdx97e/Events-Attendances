import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Events from '@/pages/Events'
import SignUp from '@/pages/SignUp'
import Profile from '@/pages/Profile'
import createMeetup from '@/pages/createMeetup'
import AuthGuard from './authGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/events/:id',
      name: 'Events',
      component: Events
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/createmeetup',
      name: 'createmeetup',
      component: createMeetup
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
