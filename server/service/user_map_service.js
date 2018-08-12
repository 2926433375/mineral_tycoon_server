const userMapModel = require('../models/user_map.js')

const userMapService = {

  async getUserMapInfo(userOpenId) {
    let queryRes = await userMapModel.getUserMapData(userOpenId)
    if(queryRes.length > 0){
      let res = []
      for (let i = 0; i < queryRes.length; i++) {
        let r = queryRes[i]
        let d = {
          mapIndex: r.map_index,
          mineralGenerationRate: r.mineral_generation_rate,
          isUnlock: r.is_unlock,
          totalMineralAmount: r.total_mineral_amount
        }
        res.push(d)
      }
      return res
    }else{
      return []
    }
  }
}

module.exports = userMapService