/* tslint:disable max-classes-per-file */

import * as _ from 'lodash'
import * as SuperAgent from 'superagent'

export interface IServerResponseData<T> {
  code: string
  message: string
  data?: T
}

export interface Response<T> extends SuperAgent.Response {
  body: IServerResponseData<T>
}

export interface SuperAgentError extends Error {
  status: number
  response?: Response<any>
}

const DURATION_10_SECONDS = 10000
const MAX_RETRY_LIMIT     = 2

export async function request<T>(sar: SuperAgent.SuperAgentRequest): Promise<T> {
  const res = await sar.timeout(DURATION_10_SECONDS).retry(MAX_RETRY_LIMIT)
  return _.get(res.body, 'data') as T
}
