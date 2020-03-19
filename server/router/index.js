import Router from 'koa-router';
const router = new Router();

router.get('/*.html', (ctx, next) => {
  ctx.render(ctx.url);
  next();
})

// router.get('/list', (ctx, next) => {
//   ctx.render();
//   next();
// })

export default router;