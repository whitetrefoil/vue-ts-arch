/* tslint:disable max-classes-per-file */

import axios, {
  AxiosRequestConfig,
}                          from 'axios'
import { isNil }           from 'lodash'
import { Observable }      from 'rxjs/Observable'

export interface AxiosResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
}

export interface AxiosError<T> extends Error {
  config: AxiosRequestConfig
  code?: string
  response?: AxiosResponse<T>
}

export interface IServerResponseData<T> {
  _code: string
  _message: string
  _data?: T
}

export type IServerResponse<T> = AxiosResponse<IServerResponseData<T>>

const DURATION_10_SECONDS = 10000
const MAX_RETRY_LIMIT     = 2

export const Axios = axios.create({
  baseURL: process.env.API_PREFIX || '/api/',
  timeout: DURATION_10_SECONDS,
})


class NetworkError extends Error {}

class ServerError extends Error {
  public response: any

  constructor(message?: string, response?: AxiosResponse<any> | any) {
    super(message)
    this.response = response
  }
}

function parseError(response: any): Observable<any> {
  if (isNil(response.response) || isNil(response.response.data)) {
    throw new NetworkError('Network error!')
  }
  if (isNil(response.response.data._message)) {
    return Observable.throw(new ServerError('Unknown server error!', response.response))
  }
  return Observable.throw(new ServerError(response.response.data._message, response.response))
}

export function extractResponse<T>(res: IServerResponse<T>): T | any {
  if (res.data._data) {
    return res.data._data
  }
  return res.data
}

export function request<T>(requestFunction: () => Promise<IServerResponse<T>>): Observable<T> {
  return Observable.defer(requestFunction)
    .map(extractResponse)
    .catch(parseError)
    .retryWhen((errors) =>
      errors.scan((retried, error) => {
        if (!(error instanceof NetworkError)) { throw error }
        if (retried >= MAX_RETRY_LIMIT) { throw error }
        return retried + 1
      }, 0),
    )
}
