require('./styles/app.sass')

import * as Vue from 'vue'
import router   from './router'

const App = require('./components/app')

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  name  : 'Root',
  render: (h) => h(App),
}).$mount('#app')
