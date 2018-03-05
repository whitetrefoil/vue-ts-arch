import { Vue }                    from 'av-ts'
import { isEmpty }                from 'lodash'
import VueRouter, { RouteConfig } from 'vue-router'

const Hello        = () => import(/* webpackChunkName: "hello" */'../modules/hello').then((m) => m.default)
const MyGlobalComp = () => import(/* webpackChunkName: "another" */'../components/my-global-comp').then((m) => m.default)

Vue.use(VueRouter)

const routerBase = isEmpty(process.env.VUE_ROUTER_BASE)
                   ? '/'
                   : process.env.VUE_ROUTER_BASE

const routes: RouteConfig[] = [
  {
    name    : 'index',
    path    : '/',
    redirect: { name: 'hello' },
  },
  {
    path     : '/hello',
    component: Hello,
    children : [
      {
        name      : 'hello',
        path      : '',
        components: {
          'my-global-comp': MyGlobalComp,
        },
      },
    ],
  },
  {
    path    : '*',
    redirect: { name: 'index' },
  },
]

export default new VueRouter({
  mode: 'history',
  base: routerBase,
  routes,
  scrollBehavior(to) {
    if (to.params['scrollToSelector']) {
      return { selector: to.params['scrollToSelector'] }
    }
    return { x: 0, y: 0 }
  },
})
