const { mysql } = require('../qcloud')

const userCollection = {
  
  async getUserCollection(userOpenId) {
    let collectionList = await mysql('user_collection_list').select('*').where({ user_open_id: userOpenId })
    return collectionList
  },

  async create(newCollection){
    await mysql('user_collection_list').insert(newCollection)
  }


}

module.exports = userCollection