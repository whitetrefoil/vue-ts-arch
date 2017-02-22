require('./styles/app.sass')

import * as _   from 'lodash'
import * as Vue from 'vue'
import router   from './router/index-server'
import store    from './store'

const isDev = process.env.NODE_ENV === 'development'
const MyApp = require('./components/my-app')

// tslint:disable-next-line no-unused-new
export const root = new Vue({
  router,
  name  : 'Root',
  render: (h) => h(MyApp),
})

export default (context: any): Promise<any> => {

  const startTime = Date.now()

  // set router's location
  router.push(context.url)
  const matchedComponents = router.getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been
  // updated.
  return Promise.all(_.map(matchedComponents, (component: any) => {
    if (component.preFetch) {
      return component.preFetch(store)
    }
  })).then(() => {
    if (isDev === true) {
      console.log(`data pre-fetch: ${Date.now() - startTime}ms`)
    }
    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    context.initialState = store.state
    return root
  })
}
