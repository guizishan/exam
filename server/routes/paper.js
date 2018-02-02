const router = require('koa-router')()
const paperService = require('../service/paperService')

router.prefix('/paper')

router.post('/add',async function (ctx, next) {
  let paper = ctx.request.body;
  let paperList = await paperService.add(paper);
  ctx.body={
    status:"ok",
    paperList
  }
})

router.get('/init', async function (ctx, next) {
  let paperList = await paperService.paperListInit();
  ctx.body={
    status:"ok",
    paperList
  }
})

module.exports = router
