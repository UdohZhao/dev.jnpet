//app.js
App({
  data: {
    // 域名
    domain: "http://dev.jnpet.local",
    phone: "18423031898",
    technicalSupport: "重庆存己科技提供技术支持"
  },
  onLaunch: function() {

    var that = this;

    // 获取用户登录态
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.data.domain + '/weapps/onLogin/code/' + res.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);
              // 用户openid存入本地缓存
              wx.setStorageSync('openid', res.data.openid);           
            },
            fail: function (e) {
              console.log(e)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });

  },
  onShow: function (options) {

    var that = this;

    // openid 
    // if (wx.getStorageSync('openid') == false) {

    //   // 获取用户登录态
    //   wx.login({
    //     success: function (res) {
    //       if (res.code) {
    //         //发起网络请求
    //         wx.request({
    //           url: that.data.domain + '/weapps/onLogin/code/' + res.code,
    //           header: {
    //             'content-type': 'application/json'
    //           },
    //           success: function (res) {
    //             console.log(res.data);
    //             // 用户openid存入本地缓存
    //             wx.setStorageSync('openid', res.data.openid);
    //           },
    //           fail: function (e) {
    //             console.log(e)
    //           }
    //         })
    //       } else {
    //         console.log('获取用户登录态失败！' + res.errMsg)
    //       }
    //     }
    //   });
      
    // }

  },

  // 获取用户信息
  getUserInfo: function(cb){
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
