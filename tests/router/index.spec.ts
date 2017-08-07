import VueRouter from 'vue-router'

describe('router', () => {
  it('should export the router', () => {
    const router = require('../../src/router/index').default
    expect(router).toBeInstanceOf(VueRouter)
  })
})

