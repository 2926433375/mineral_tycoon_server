const userCollectionModel = require('../models/user_collection.js')

const userCollectionService = {

  async getUserCollectionList(userOpenId) {
    let queryRes = await userCollectionModel.getUserCollection(userOpenId)
    if(queryRes.length > 0){
      let res = []
      for (let i = 0; i < queryRes.length; i++) {
        let r = queryRes[i]
        let d = {
          collectionId: r.id,
          collectionIndex: r.collection_index,
          collectionCount: r.get_count
        }
        res.push(d)
      }
      return res
    }else{
      return []
    }
  }
}

module.exports = userCollectionService