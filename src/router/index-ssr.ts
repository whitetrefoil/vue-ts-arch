// This is a SSR version of router which disabled webpack code splitting.

import { Vue }            from 'av-ts'
import { isEmpty }        from 'lodash'
import * as VueRouter     from 'vue-router'

const Hello        = require('../modules/hello')
const MyGlobalComp = require('../components/my-global-comp')

Vue.use(VueRouter)

const routerBase = isEmpty(process.env.VUE_ROUTER_BASE)
  ? '/'
  : process.env.VUE_ROUTER_BASE

const routes: VueRouter.RouteConfig[] = [
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
