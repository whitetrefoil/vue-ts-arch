require('./styles/app.sass')

import * as Vue from 'vue'
import router   from './router'

const MyApp = require('./components/my-app')

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  name  : 'Root',
  render: (h) => h(MyApp),
}).$mount('#app')
