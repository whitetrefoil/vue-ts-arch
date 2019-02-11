import { Vue }                    from 'av-ts'
import VueRouter, { RouteConfig } from 'vue-router'
import MyGlobalComp               from './components/my-global-comp'
import HelloComponent             from './modules/hello'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    name     : 'hello',
    path     : '/',
    component: HelloComponent,
    children : [
      {
        name      : 'inner',
        path      : '/:name',
        components: {
          'my-global-comp': MyGlobalComp,
        },
        props     : {
          'my-global-comp': true,
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_ROUTER_BASE,
  routes,
})

export default router
