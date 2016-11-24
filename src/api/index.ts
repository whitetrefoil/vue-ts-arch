/* tslint:disable max-classes-per-file */

import * as axios from 'axios'
import isNil    = require('lodash/isNil')
import AxiosXHR = Axios.AxiosXHR
import { Observable } from 'rxjs/Observable'

const DURATION_10_SECONDS = 10000
const MAX_RETRY_LIMIT     = 2

export const Axios = axios.create({
  baseURL: process.env.API_PREFIX || '/api/',
  timeout: DURATION_10_SECONDS,
})

class NetworkError extends Error {}
// TypeScript's issue...
// w/o assign prototype manually,
// `new NetworkError() instanceof NetworkError` will be `false`
NetworkError.prototype = <any> Error.prototype

class ServerError extends Error {
  public response: any

  constructor(message?: string, response?: AxiosXHR<any> | any) {
    super(message)
    this.response = response
  }
}
ServerError.prototype = <any> Error.prototype

function parseError(response: any): Observable<any> {
  if (isNil(response.response) || isNil(response.response.data)) {
    throw new NetworkError('Network error!')
  }
  if (isNil(response.response.data._message)) {
    return Observable.throw(new ServerError('Unknown server error!', response.response))
  }
  return Observable.throw(new ServerError(response.response.data._message, response.response))
}

export interface IServerResponse<T> {
  _code: string
  _message: string
  _data?: T
}

export function extractResponse<T>(res: IServerResponseXHR<T>): T | any {
  if (res.data._data) {
    return res.data._data
  }
  return res.data
}

export function request<T>(requestFunction: () => Promise<IServerResponseXHR<T>>): Observable<T> {
  return Observable.defer(requestFunction)
    .map(extractResponse)
    .catch(parseError)
    .retryWhen((errors) => {
      return errors.scan((retried, error) => {
        if (!(error instanceof NetworkError)) { throw error }
        if (retried >= MAX_RETRY_LIMIT) { throw error }
        return retried + 1
      }, 0)
    })
}

export type IServerResponseXHR<T> = AxiosXHR<IServerResponse<T>>
