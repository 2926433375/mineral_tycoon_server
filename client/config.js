/**
 * 小游戏配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://71fkohlb.qcloud.la';

var config = {

    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        gameSummaryDataurl: `${host}/weapp/user_game_summary_data`,

        userWorkerUrl: `${host}/weapp/user_worker_info`,

        userMapUrl: `${host}/weapp/user_map_info`,

        userCollectionUrl: `${host}/weapp/user_collection_info`
    }
};

module.exports = config;