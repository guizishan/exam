const router = require('koa-router')()
const questionService = require('../service/question')

router.prefix('/question')

router.post('/add',async function (ctx, next) {
  let question = ctx.request.body;
  let id = await questionService.add(question);
  ctx.body={
    id,
    status:"ok"
  }
})

router.get('/queryQuestionByTech',async function (ctx, next) {
  let tech = ctx.query.tech;
  let questions = await questionService.queryQuestionByTech(tech);
  console.log(questions);
  ctx.body={
    status:'ok',
    questions
  }
})

module.exports = router
