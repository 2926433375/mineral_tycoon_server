const { tunnel } = require('../qcloud')
const { mysql } = require('../qcloud')
const tunnelTempInfoModel = require('../models/tunnel_temp_info.js')
const debug = require('debug')('koa-weapp-demo')
const eventHandler = require('../service/event_service.js')

var allConnectedTunnel = new Set()

/**
 * 调用 TunnelService.closeTunnel() 关闭信道
 * @param  {String} tunnelId 信道ID
 */
const $close = (tunnelId) => {
    tunnel.closeTunnel(tunnelId)
    tunnelTempInfoModel.deleteData(tunnelId)
}



module.exports = {
    // 小游戏请求 websocket 地址
    get: async ctx => {
        const data = await tunnel.getTunnelUrl(ctx.req)
        const tunnelInfo = data.tunnel
        let newTunnelTempInfo = {
          tunnel_id: tunnelInfo.tunnelId,
          user_open_id: data.userinfo.openId
        }
      await tunnelTempInfoModel.insertData(newTunnelTempInfo)
      ctx.state.data = tunnelInfo
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        const packet = await tunnel.onTunnelMessage(ctx.request.body)
        debug('Tunnel recive a package: %o', packet)
        let userOpenId = await tunnelTempInfoModel.getUserOpenId(packet.tunnelId)
        console.log('useropenid:', userOpenId)
        if(userOpenId){
          switch (packet.type) {
            case 'connect':
              //记录一些数据到db
              break
            case 'message':
              eventHandler.processEvent(userOpenId, packet.content.messageType, packet.content.messageContent)
              break
            case 'close':
              $close(packet.tunnelId)
              break
          }
        }else{
          $close(packet.tunnelId)
        }
        
    }

}
