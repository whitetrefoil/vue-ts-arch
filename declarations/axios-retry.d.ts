declare module 'axios-retry' {
  import { AxiosInstance } from 'axios'

  export interface IAxiosRetryOptions {
    retries?: number
    retryCondition?(): boolean
  }

  function axiosRetry(axios: AxiosInstance, options: IAxiosRetryOptions): void

  export default axiosRetry
}
