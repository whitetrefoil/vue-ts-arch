import request = require('superagent')

declare module 'superagent' {
  interface SuperAgentRequest {
    retry(times: number): this
  }
}
