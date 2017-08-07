import { request, NetworkError, ServerError } from '../../src/api'

jest.resetModules()

it('should export a function', () => {
  expect(typeof request).toBe('function')
})

it('should call the function passed in then handle the response', () => {
  const mockRequestFn = () => Promise.resolve({
    data: {
      data: 'I am a mock',
    },
  } as any)

  expect(request<string>(mockRequestFn)).resolves.toBe('I am a mock')
})
