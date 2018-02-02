const router = require('koa-router')()
const techService = require('../service/TechknowledgeService');

router.prefix('/tech')

// 当客户端请求/tech/init的时候，返回技术树
router.get('/init', async function (ctx, next) {
  let treeData = await techService.init();
  ctx.body={
    treeData
  }
})

router.post('/add', async function (ctx, next) {
  let tech = ctx.request.body;
  console.log(tech);
  let treeData = await techService.addTechknowledge(tech);
  
  ctx.body={
    treeData
  }
})

module.exports = router
