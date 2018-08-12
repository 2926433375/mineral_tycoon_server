const { mysql } = require('../qcloud')

const userMap = {

  async getUserMapData(userOpenId){
    let mapInfoList = await mysql('user_map_info').select('*').where({ user_open_id: userOpenId })
    return mapInfoList
  }

  
}

module.exports = userMap