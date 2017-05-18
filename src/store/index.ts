import * as Vue  from 'vue'
import * as Vuex from 'vuex'
import { hello } from './hello'
import * as t    from './types'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules: {
    hello,
  },
})

export const types = t
