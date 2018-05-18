// tslint:disable:no-import-side-effect

import './theme'

import Vue           from 'vue'
import MyApp         from './components/my-app'
import router        from './router'
import { getLogger } from './services/log'
import './styles/app.sass'

const { debug } = getLogger(__filename)

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  name  : 'Root',
  render: (h) => h(MyApp),
}).$mount('#app')

debug('Vue is initialized!')

const loadingErrorDiv = document.getElementById('loading-error')
if (loadingErrorDiv != null) {
  loadingErrorDiv.remove()
}
