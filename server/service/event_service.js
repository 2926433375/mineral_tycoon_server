const { tunnel } = require('../qcloud')
const userGameDataModel = require('../models/user_game_data.js')
const tunnelTempInfoModel = require('../models/tunnel_temp_info.js')
const userWorkerModel = require('../models/user_worker.js')
const userCollectionModel = require('../models/user_collection.js')
const userMapModel = require('../models/user_map.js')
const baseGameConfig = require('../base_game_config.js')

const EVENT_TYPE = {
  coinChangeEvent: 'coinChangeEvent',
  diamondChangeEvent: 'diamondChangeEvent',
  buffAddEvent: 'buffAddEvent',
  workerEvent: 'workerEvent',
  collectionEvent: 'collectionEvent',
  achievementEvent: 'achievementEvent',
  researchEvent: 'researchEvent'
}

// const $notify = (type, content) => {
//   tunnel.broadcast(connectedTunnelIds, type, content)
//     .then(result => {
//       const invalidTunnelIds = result.data && result.data.invalidTunnelIds || []
//       if (invalidTunnelIds.length > 0) {
//         console.log('检测到无效的信道 IDs =>', invalidTunnelIds)
//       }
//     })
// }

function calcWorkerProlificacy(curWorkerProlificacy, newLevel, health){
  return curWorkerProlificacy * baseGameConfig.workerLevelAddition[newLevel] * baseGameConfig.workerHealthLevelDeductio[health]
}


/**
  * 用户金币数更新
  * msgBody:{
  *  operation: dec/add,
  *  count:
  * }
  */
async function onCoinChangeEvent(userOpenId, msgBody){
  let queryData = await userGameDataModel.getUserData(userOpenId, 'coin_count')
  let curCoin = queryData.coin_count
  switch (msgBody.operation) {
    case 'dec':
      curCoin = curCoin - msgBody.count
      break
    case 'add':
      curCoin = curCoin + msgBody.count
      break
  }
  let updateData = {
    'coin_count': curCoin
  }
  userGameDataModel.updateUserSummaryData(userOpenId, updateData)
}

/**
 * 用户钻石数量更新
 * msgBody:{
 *  operation: dec/add,
 *  count:
 * }
 */
async function onDiamondChangeEvent(userOpenId, msgBody){
  let queryRes = await userGameDataModel.getUserData(userOpenId, 'diamond_count')
  let curDiamond = queryRes.diamond_count
  switch (msgBody.operation) {
    case 'dec':
      curDiamond = curDiamond - msgBody.count
      break
    case 'add':
      curDiamond = curDiamond + msgBody.count
      break
  }
  let updateData = {
    'diamond_count': curDiamond
  }
  userGameDataModel.updateUserSummaryData(userOpenId, updateData)
}

async function onBuffAddEvent(userOpenId, msgBody){

}

/**
 * 工人事件处理
 * msgBody:{
 *  event: new/levelUp/doWork/halt/updateStatus
 *  data:{
 *    workerId:1,
 *    health:1
 *  }
 * }
 */
async function onWorkerEvent(userOpenId, msgBody) {
  let workerEvent = msgBody.event
  let data = msgBody.data

  switch(workerEvent){
    //新增工人
    case 'new':
      let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
      let userSummaryData = queryRes[0]
      let curWorkerCount = userSummaryData.worker_count + 1
      let newWorkerProlificacy = baseGameConfig.workerBaseProlificacy *
        baseGameConfig.equipment1Addition[userSummaryData.equipment1_level] *
        baseGameConfig.equipment2Addition[userSummaryData.equipment2_level] *
        baseGameConfig.equipment3Addition[userSummaryData.equipment3_level] *
        baseGameConfig.equipment4Addition[userSummaryData.equipment4_level] *
        baseGameConfig.equipment5Addition[userSummaryData.equipment5_level]
      //更新工人列表
      let newWorker = {
        user_open_id: userOpenId,
        prolificacy: newWorkerProlificacy
      }
      userWorkerModel.insert(newWorker)
      //更新用户数据总览表
      let updateSummryData = {
        worker_count: curWorkerCount
      }
      userGameDataModel.updateUserSummaryData(userOpenId, updateSummryData)
      break
    case 'levelUp':
      let workerId = data.workerId
      let workerInfo = await userWorkerModel.getWorkerInfo(workerId)
      let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
      let userSummaryData = queryRes[0]
      let workerProlificacy = workerInfo.prolificacy
      let workerLevel = workerInfo.worker_level + 1
      let workerHealth = workerInfo.health
      //当前总生产力减去此工人目前提供的生产力
      let curProlificacy = userSummaryData.cur_prolificacy - workerProlificacy
      workerProlificacy = calcWorkerProlificacy(workerProlificacy, workerLevel, workerHealth)
      curProlificacy = curProlificacy + workerProlificacy
      //更新此工人信息
      let updateWorkerData = {
        worker_level: workerLevel,
        prolificacy: workerProlificacy,
        cur_hit: baseGameConfig.workerLevelHit[workerLevel]
      }
      userWorkerModel.updateWorkerInfo(workerId, updateWorkerData)
      //更新玩家总生产力
      let updateUserGameData = {
        cur_prolificacy: curProlificacy
      }
      userGameDataModel.updateUserSummaryData(userOpenId, updateSummryData)
      break
    case 'doWork':
      let workerId = data.workerId
      let workerInfo = await userWorkerModel.getWorkerInfo(workerId)
      let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
      let userSummaryData = queryRes[0]
      let curProlificacy = userSummaryData.cur_prolificacy + workerInfo.prolificacy
      //更新此工人信息
      let updateWorkerData = {
        cur_state: 1
      }
      userWorkerModel.updateWorkerInfo(workerId, updateWorkerData)
      //更新玩家总生产力
      let updateUserGameData = {
        cur_prolificacy: curProlificacy
      }
      userGameDataModel.updateUserSummaryData(userOpenId, updateSummryData)
      break
    case 'halt':
      let workerId = data.workerId
      let workerInfo = await userWorkerModel.getWorkerInfo(workerId)
      let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
      let userSummaryData = queryRes[0]
      let curProlificacy = userSummaryData.cur_prolificacy - workerInfo.prolificacy
      //更新此工人信息
      let updateWorkerData = {
        cur_state: 0
      }
      userWorkerModel.updateWorkerInfo(workerId, updateWorkerData)
      //更新玩家总生产力
      let updateUserGameData = {
        cur_prolificacy: curProlificacy
      }
      userGameDataModel.updateUserSummaryData(userOpenId, updateSummryData)
      break
    case 'updateHealth':
      let workerId = data.workerId
      let newHealth = data.health
      let workerInfo = await userWorkerModel.getWorkerInfo(workerId)
      let workerProlificacy = workerInfo.prolificacy
      let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
      let userSummaryData = queryRes[0]

      //当前总生产力减去此工人目前提供的生产力
      let curProlificacy = userSummaryData.cur_prolificacy - workerProlificacy
      workerProlificacy = calcWorkerProlificacy(workerProlificacy, workerLevel, newHealth)
      curProlificacy = curProlificacy + workerProlificacy

      //更新此工人信息
      let updateWorkerData = {
        health: newHealth,
        prolificacy: workerProlificacy
      }
      userWorkerModel.updateWorkerInfo(workerId, updateWorkerData)
      //更新玩家总生产力
      let updateUserGameData = {
        cur_prolificacy: curProlificacy
      }
      userGameDataModel.updateUserSummaryData(userOpenId, updateSummryData)
      break
  }
}

async function onCollectionEvent(userOpenId, msgBody) {

}

async function onAchievementEvent(userOpenId, msgBody) {

}

/**
 * 装备升级事件处理
 * msgBody:{
 *  data:{
 *    equipmentIndex:1
 *  }
 * }
 */
async function onResearchEvent(userOpenId, msgBody) {
  
}


const eventService = {

  /**
   * 事件处理入口
   */
  async processEvent(userOpenId, type, msgBody){
    if(userOpenId){
      switch (type) {
        case EVENT_TYPE.coinChangeEvent:
          onCoinChangeEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.diamondChangeEvent:
          onDiamondChangeEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.buffAddEvent:
          onBuffAddEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.workerEvent:
          onWorkerEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.collectionEvent:
          onCollectionEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.achievementEvent:
          onAchievementEvent(userOpenId, msgBody)
          break
        case EVENT_TYPE.researchEvent:
          onResearchEvent(userOpenId, msgBody)
      }
    }
  }
}

module.exports = eventService

