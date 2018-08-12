const { mysql } = require('../qcloud')

const tunnelTempInfo = {

  async getUserOpenId(tunnelId) {
    let data = await mysql('tunnel_temp_info').select('user_open_id').where({ tunnel_id: tunnelId })
    if(data.length > 0){
      return data[0].user_open_id
    }else{
      return null
    }
  },

  async deleteData(tunnelId) {
    await mysql("tunnel_temp_info").where('tunnel_id', tunnelId).del()
  },

  async insertData(newTunnelTempInfo) {
    await mysql("tunnel_temp_info").insert(newTunnelTempInfo)
  }
}
module.exports = tunnelTempInfo