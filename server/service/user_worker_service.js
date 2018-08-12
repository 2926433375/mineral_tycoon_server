const userWorkerModel = require('../models/user_worker.js')

const userWorkerService = {

  async getUserWorkerList(userOpenId){
    let queryRes = await userWorkerModel.getUserWorker(userOpenId)
    if (queryRes.length > 0) {
      let res = []
      for (let i = 0; i < queryRes.length; i++) {
        let r = queryRes[i]
        let d = {
          workerId: r.id,
          workerLevel: r.worker_level,
          health: r.health,
          prolificacy: r.prolificacy,
          curStatus: r.cur_status
        }
        res.push(d)
      }
      return res
    } else {
      return []
    }
  }
}

module.exports = userWorkerService