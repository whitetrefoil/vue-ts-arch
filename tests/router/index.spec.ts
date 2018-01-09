import VueRouter from 'vue-router'
import router    from '../../src/router'

describe('router', () => {
  it('should export the router', () => {
    expect(router).toBeInstanceOf(VueRouter)
  })
})

