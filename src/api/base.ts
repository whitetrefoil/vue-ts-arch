import Ky, { ResponsePromise }          from 'ky';
import * as QS                          from 'querystring';
import { getLogger }                    from '../services/log';
import { NetworkError, RespondedError } from './errors';


interface IResponseWrapper<T> {
  code: number;
  message: string;
  data: T;
}

const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);

let _token: string|null;

export function setToken(token: string|null) {
  debug(`Set "X-Token" to ${JSON.stringify(token)}`);
  _token = token;
}


async function parseResponse<T_RES>(resP: ResponsePromise): Promise<T_RES> {
  let res: Response;

  try {
    res = await resP;
  } catch (e) {
    throw new NetworkError(e);
  }

  const data = await res.json() as IResponseWrapper<T_RES>;
  if (res.ok !== true) {
    throw new RespondedError(res, data.message);
  }

  return data.data;
}


const ky = Ky.extend({
  prefixUrl      : '/api',
  retry          : 1,
  timeout        : 10000,
  throwHttpErrors: true,
  headers        : {
    'content-type': 'application/json',
    'accept'      : 'application/json',
  },
  hooks          : {
    beforeRequest: [
      options => {
        if (_token != null) {
          (options as Request).headers.set('x-token', _token);
        }
      },
    ],
  },
});


export async function get<T_RES = unknown>(url: string, params?: QS.ParsedUrlQueryInput): Promise<T_RES> {
  const ps = QS.stringify(params);

  const pathname = ps === '' ? url : `${url}?${ps}`;

  return parseResponse<T_RES>(ky.get(pathname));
}
