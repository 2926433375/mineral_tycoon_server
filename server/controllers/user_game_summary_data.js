const userGameSummaryDataService = require('../service/user_game_summary_data_service.js')

module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  if (ctx.state.$wxInfo.loginState === 1) {
    // loginState 为 1，登录态校验成功
    let userOpenId = ctx.state.$wxInfo.userinfo.openId
    let curUserGameSummaryData = await userGameSummaryDataService.getUserGameSummaryData(userOpenId)
    if (curUserGameSummaryData === null) {
      //首次进入游戏，初始化游戏数据
      let newUserData = {
        user_open_id: userOpenId,
      }
      await userGameSummaryDataService.create(newUserData)
      curUserGameSummaryData = await userGameSummaryDataService.getUserGameSummaryData(userOpenId)
    }
    //TODO:根据上次登陆时间计算应获得的金币数
    ctx.state.data = curUserGameSummaryData
  } else {
    ctx.state.code = -1
  }
}