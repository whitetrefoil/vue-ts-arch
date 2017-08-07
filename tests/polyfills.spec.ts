// tslint:disable:no-import-side-effect
import '../src/polyfills'

jest.resetModules()

it('should import babel polyfills', () => {
  expect(global['regeneratorRuntime']).toBeDefined()
})

it('should set stack tract limit', () => {
  expect(Error['stackTraceLimit']).toBe(Infinity)
})
