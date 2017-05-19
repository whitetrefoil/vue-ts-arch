// tslint:disable-next-line:no-import-side-effect

import './styles/app.sass'

import Vue    from 'vue'
import router from './router'

const MyApp = require('./components/my-app')

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  name  : 'Root',
  render: (h) => h(MyApp),
}).$mount('#app')
