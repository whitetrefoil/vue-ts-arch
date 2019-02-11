import VueElemId     from '@whitetrefoil/vue-elem-id'
import Vue           from 'vue'
import MyApp         from './components/my-app'
import router        from './router'
import { getLogger } from './services/log'
import { store }     from './store'
import './styles/app.sass'

const { debug } = getLogger(`/src/${__filename.split('?')[0]}`)

Vue.use(VueElemId)

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  store,
  name  : 'Root',
  render: h => h(MyApp),
}).$mount('#app')

debug('Vue is initialized!')

const loadingErrorDiv = document.getElementById('loading-error')
if (loadingErrorDiv != null) {
  loadingErrorDiv.remove()
}
