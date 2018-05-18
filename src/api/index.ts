/* tslint:disable max-classes-per-file */

import axios, { AxiosError, AxiosResponse } from 'axios'
import axiosRetry                           from 'axios-retry/lib'

export interface IServerResponseData<T> {
  code: string
  message: string
  data?: T
}

export interface IAxiosResponse<T> extends AxiosResponse {
  data: T
}

export type IResponse<T> = IAxiosResponse<IServerResponseData<T>>

export interface IAxiosError<T> extends AxiosError {
  response?: IAxiosResponse<T>
}

const DURATION_10_SECONDS = 10000
const MAX_RETRY_LIMIT     = 2

// tslint:disable-next-line:variable-name
export const Axios = axios.create({
  baseURL: process.env.API_PREFIX || '/',
  timeout: DURATION_10_SECONDS,
})

axiosRetry(Axios, { retries: MAX_RETRY_LIMIT })

export class NetworkError extends Error {}

export class ServerError extends Error {
  public response: any

  constructor(message?: string, response?: IAxiosResponse<any>|any) {
    super(message)
    this.response = response
  }
}

function parseError(error: IAxiosError<any>): never {
  if (error.response == null) {
    throw new NetworkError('Network error!')
  }
  throw new ServerError('Unknown server error!', error.response)
}

export function extractResponse<T>(res: IResponse<T>): T|any {
  return res.data.data
}

export function request<T>(requestFunction: () => Promise<IResponse<T>>): Promise<T> {
  const sendRequest = (): Promise<IResponse<T>> =>
    requestFunction()
      .catch(parseError)

  return sendRequest()
    .then(extractResponse)
}
