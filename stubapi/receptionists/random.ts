import { Middleware } from 'koa';
import { Random }     from 'mockjs';


export const getRandom: Middleware = async(ctx, next) => {
  ctx.status = 200;
  ctx.set('Content-Type', 'application/json');
  ctx.body = {
    name: Random.name(),
  };
};
