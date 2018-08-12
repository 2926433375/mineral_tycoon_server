import './js/libs/weapp-adapter'
import './js/libs/symbol'

var qcloud = require('./js/libs/wafer2-client-sdk/index')
var config = require('./config')
var runtime = require('./js/runtime/index')
var util = require('./js/utils/util.js')

qcloud.setLoginUrl(config.service.loginUrl)

window._globalData = {
  tunnelStatus: 'unconnected', //只建立一个长连接websocket
  isLogin: false,
  userInfo: {}, //登录账号信息
  realTimeRank: [] // 榜单
};

//登录
runtime.handleLogin()

//打开websocket信道长连接
runtime.openTunnel()

console.log("=====gamesummarydata========");
qcloud.request({
  url: config.service.gameSummaryDataurl,
  login: true,
  success(result) {
    util.showSuccess('获得用户游戏数据')
    console.log(result.data)
  },

  fail(error) {
    util.showModel('请求失败', error)
    console.log('request fail', error)
  }
})

console.log("=====workedata========");
qcloud.request({
  url: config.service.userWorkerUrl,
  login: true,
  success(result) {
    util.showSuccess('获得用户工人数据')
    console.log(result.data)
  },

  fail(error) {
    util.showModel('请求失败', error)
    console.log('request fail', error)
  }
})

console.log("=====mapdata========");
qcloud.request({
  url: config.service.userMapUrl,
  login: true,
  success(result) {
    util.showSuccess('获得用户地图数据')
    console.log(result.data)
  },

  fail(error) {
    util.showModel('请求失败', error)
    console.log('request fail', error)
  }
})

console.log("=====collectiondata========");
qcloud.request({
  url: config.service.userCollectionUrl,
  login: true,
  success(result) {
    util.showSuccess('获得用户地图数据')
    console.log(result.data)
  },

  fail(error) {
    util.showModel('请求失败', error)
    console.log('request fail', error)
  }
})





setTimeout( function() {
  let d = {
    operation: 'add',
    count: 120
  }
  runtime.sendMessage('coinChangeEvent', d)
  runtime.closeTunnel()
  }, 3000)



