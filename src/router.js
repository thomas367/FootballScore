import Vue from 'vue'
import Router from 'vue-router'
import Competitions from './components/competitions.vue'
import League from './components/league.vue'
import Team from './components/team.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	component: Competitions
    },
    {
    	path: '/league',
    	name: 'league',
    	props: true,
    	component: League
    },
    {
        path: '/team',
        name: 'team',
        props: true,
        component: Team
    }
  ]
})
