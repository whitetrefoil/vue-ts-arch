import * as axios from 'axios'
import AxiosXHR = Axios.AxiosXHR

const DURATION_10_SECONDS = 10000

export default axios.create({
  baseURL: process.env.API_PREFIX || '/api/',
  timeout: DURATION_10_SECONDS,
})

export interface IDompResponse {
  errorCode: string
  errorMessage: string
  obj?: any
}

export type IDompResponseXHR = AxiosXHR<IDompResponse>
