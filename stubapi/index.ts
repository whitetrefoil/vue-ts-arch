import log                 from 'fancy-log';
import Koa, { Middleware } from 'koa';
import koaBodyparser       from 'koa-bodyparser';
import mount               from 'koa-mount';
import receptionists       from './receptionists';

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing';

function formatResponse(): Middleware {
  return async(ctx, next) => {
    try {
      await next();
    } catch (e) {
      const status = e.status || 500;
      const expose = e.expose || isDev || status < 500;
      ctx.body     = {
        error: expose ? e.message() : 'internal server error',
      };
      if (isDev) {
        ctx.body.stack = e.stack();
      }
    }

    ctx.set('content-type', 'application/json');

    ctx.body = {
      code: ctx.status,
      data: ctx.body,
    };
  };
}

function run(port: number) {

  const koa = new Koa();
  koa.use(koaBodyparser());
  koa.use(formatResponse());

  koa.use(mount('/api/receptionists', receptionists));

  koa.listen(port, '0.0.0.0');
  log(`Stubapi server started at port ${port}`);
}

export default run;
