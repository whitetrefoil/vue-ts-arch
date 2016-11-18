import * as axios from 'axios'
import isNil    = require('lodash/isNil')
import AxiosXHR = Axios.AxiosXHR

const DURATION_10_SECONDS = 10000

export default axios.create({
  baseURL: process.env.API_PREFIX || '/api/',
  timeout: DURATION_10_SECONDS,
})

export function getErrorMessage(response: any): string {
  if (isNil(response.response)) { return 'Network error!' }
  if (isNil(response.response.data) || isNil(response.response.data._message)) {
    return 'Unknown server error!'
  }
  if (!isNil(response.response.data._message)) {
    return response.response.data._message
  }
  return 'Unknown error!'
}

export interface IServerResponse<T> {
  _code: string
  _message: string
  _data?: T
}

export type IServerResponseXHR<T> = AxiosXHR<IServerResponse<T>>
