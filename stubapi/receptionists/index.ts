import Koa           from 'koa';
import KoaRouter     from 'koa-router';
import { getRandom } from './random';


const koa = new Koa();
const kr = new KoaRouter();

kr.get('/random', getRandom);

koa.use(kr.routes());
koa.use(kr.allowedMethods());

export default koa;
