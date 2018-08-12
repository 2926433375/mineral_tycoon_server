const { mysql } = require('../qcloud')

const userWorker = {

  async getUserWorker(userOpenId){
    let workerList = await mysql('user_worker_info').select('*').where({ user_open_id: userOpenId })
    return workerList
  },

  async insert(newWorker){
    mysql('user_worker_info').insert(newWorker)
  },

  async getWorkerInfo(workerId){
    let workerInfo = await mysql('user_worker_info').select('*').where({ id: workerId }).first()
    return workerInfo
  },

  async updateWorkerInfo(workerId, updateData){
    mysql('user_worker_info').where({ id: workerId }).update(updateData)
  }



}

module.exports = userWorker