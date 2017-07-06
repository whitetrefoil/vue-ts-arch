// tslint:disable-next-line:no-import-side-effect

import './styles/app.sass'

import Vue from 'vue'
import MyApp from './components/my-app'
import router from './router'

// tslint:disable-next-line no-unused-new
new Vue({
  router,
  name  : 'Root',
  render: (h) => h(MyApp),
}).$mount('#app')
