import Vue                        from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';


const Hello  = () =>
  import(/*webpackChunkName:"components|pages|Hello"*/'./components/pages/Hello').then(m => m.default);
const Shared = () =>
  import(/*webpackChunkName:"components|shared|Shared"*/'./components/shared/Shared').then(m => m.default);


const routes: RouteConfig[] = [
  {
    name     : 'hello',
    path     : '/',
    component: Hello,
    children : [
      {
        name      : 'inner',
        path      : '/:name',
        components: {
          'shared-comp-here': Shared,
        },
        props     : {
          'shared-comp-here': true,
        },
      },
    ],
  },
];


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_ROUTER_BASE,
  routes,
});

export default router;
