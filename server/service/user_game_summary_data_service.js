const userGameDataModel = require('../models/user_game_data.js')

const userGameSummaryDataService = {

  async getUserGameSummaryData(userOpenId) {
    let queryRes = await userGameDataModel.getUserSummaryDataByUserId(userOpenId)
    if(queryRes.length > 0) {
      let r = queryRes[0]
      let res = {
        userOpenId: r.user_open_id,
        workerCount: r.worker_count,
        coinCount: r.coin_count,
        diamondCount: r.diamond_count,
        mapUnlockLevel: r.map_unlock_level,
        curProlificacy: r.cur_prolificacy,
        coinAchievement: r.coin_achievement,
        workerAchievement: r.worker_achievement,
        totalCollection_count: r.total_collection_count,
        collectionAchievement: r.collection_achievement,
        mapAchievement: r.map_achievement,
        equipment1Level: r.equipment1_level,
        equipment2Level: r.equipment2_level,
        equipment3Level: r.equipment3_level,
        equipment4Level: r.equipment4_level,
        equipment5Level: r.equipment5_level,
        curLuckValue: r.cur_luck_value,
        curUseMap: r.cur_use_map
      }
      return res
    }else{
      return null
    }
    
  },

  async create(newUserData) {
    await userGameDataModel.insertNewUserSummaryData(newUserData)
  },

  async updateUserData(userOpenId, attrAndValue) {
    await userGameDataModel.updateUserSummaryData(userOpenId, attrAndValue)
  },

  async getUserAttributeData(userOpenId, attr){
    return await userGameDataModel.getUserData(userOpenId, attr)
  }

}

module.exports = userGameSummaryDataService