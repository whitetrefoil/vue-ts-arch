import { proxyMiddlewareFactory } from '@whitetrefoil/koa-http-proxy';
import log                        from 'fancy-log';
import gulp                       from 'gulp';
import Koa                        from 'koa';
import config                     from '../config';


gulp.task('backend', done => {
  const app = new Koa();

  log('Will use proxy mode.');

  const url = new URL(config.backendDest);

  app.use(proxyMiddlewareFactory(config.apiPrefixes, {
    target : url.href,
    secure : false,
    xfwd   : true,
    headers: {
      host   : url.host,
      origin : url.host,
      referer: url.href,
    },
  }));

  app.listen(config.serverPort + 1, () => {
    log(`Backend server listening at port ${config.serverPort + 1}`);
    done();
  });
});
