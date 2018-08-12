const { mysql } = require('../qcloud')

const userGameData = {

  async getUserSummaryDataByUserId(userOpenId) {
    let userGameSummaryData = await mysql('user_game_summary_data').select('*').where({ user_open_id: userOpenId })
    return userGameSummaryData
  },

  async insertNewUserSummaryData(newUserData){
    await mysql('user_game_summary_data').insert(newUserData)
  },

  async updateUserSummaryData(userOpenId, updateData){
    await mysql('user_game_summary_data').where({ user_open_id: userOpenId }).update(updateData)
  },

  async getUserData(userOpenId, attr){
    let userData = await mysql('user_game_summary_data').select(attr).where({ user_open_id: userOpenId }).first()
    return userData
  }
}

module.exports = userGameData