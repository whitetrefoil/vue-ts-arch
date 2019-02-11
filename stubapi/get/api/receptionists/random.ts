import { Middleware } from 'koa'
import { Random }     from 'mockjs'

const mm: Middleware = async(ctx, next) => {
  ctx.status = 200
  ctx.set('Content-Type', 'application/json')
  ctx.body = {
    code   : 200,
    message: 'OK',
    data   : {
      name: Random.name(),
    },
  }
}

export default mm
