import 'styles/app.sass'

import Vue  = require('vue')
import router from './services/router'

const App = require('./components/app.component.vue')

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  el    : '#app',
  name  : 'Root',
  render: (h) => h(App),
})
