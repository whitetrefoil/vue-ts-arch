import { getLogger } from './services/log';
import './styles/app.scss';

const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);

async function bootstrap(): Promise<void> {
  const Vue = (await import(/*webpackChunkName:"vue"*/'vue')).default;

  const VueElemId = (await import(/*webpackChunkName:"@whitetrefoil|vue-elem-id"*/'@whitetrefoil/vue-elem-id')).default;

  Vue.use(VueElemId);

  const [MyApp, router, store, aa] = await Promise.all([
    import(/*webpackChunkName:"|components|MyApp"*/'./components/MyApp').then(m => m.default),
    import(/*webpackChunkName:"|router"*/'./router').then(m => m.default),
    import(/*webpackChunkName:"|store"*/'./store').then(m => m.store),
    import(/*webpackChunkName:"|components|shared|aa"*/'./components/globals/aa').then(m => m.default),
  ]);

  Vue.component('aa', aa);

  // tslint:disable-next-line no-unused-new
  new Vue({
    router,
    store,
    name  : 'Root',
    render: h => h(MyApp),
  }).$mount('#app');
}


bootstrap()
  .then(() => {
    debug('Vue is initialized!');

    const loadingErrorDiv = document.getElementById('loading-error');
    if (loadingErrorDiv != null) {
      loadingErrorDiv.remove();
    }
  });
