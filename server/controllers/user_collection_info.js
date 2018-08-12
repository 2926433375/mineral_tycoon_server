const userCollectionService = require('../service/user_collection_service.js')

module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  if (ctx.state.$wxInfo.loginState === 1) {
    // loginState 为 1，登录态校验成功
    let userOpenId = ctx.state.$wxInfo.userinfo.openId
    let collectionList = await userCollectionService.getUserCollectionList(userOpenId)
    ctx.state.data = collectionList
  } else {
    ctx.state.code = -1
  }
}