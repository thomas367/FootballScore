import Vue from 'vue'
import Router from 'vue-router'
import Competitions from './components/competitions.vue'
import Competition from './components/competition.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	component: Competitions
    },
    {
    	path: '/competition',
    	name: 'competition',
    	props: true,
    	component: Competition
    }
  ]
})
