// estimateDetail.js
//获取应用实例
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: App.data.domain,
    technicalSupport: App.data.technicalSupport,
    radioItems: [
      { name: '好评', value: '0', checked: true },
      { name: '中评', value: '1' },
      { name: '差评', value: '2' }
    ],
    checkedRadio: 0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    console.log(options);

    that.setData({
      iid: options.iid,
      gid: options.gid,
      goods_specification: options.goods_specification
    });

    //调用应用实例的方法获取全局数据
    App.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    console.log(that.data.iid);
    console.log(that.data.gid);
    console.log(that.data.goods_specification);
    console.log(that.data.userInfo);
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 单选框改变事件
   */
  radioChange: function (e) {

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      checkedRadio: e.detail.value
    });
  },

  /**
   * 提交评价
   */
  EventEstimateForm: function (e) {

    var that = this;

    // 获取订单id，商品id，商品规格，评价状态，评价内容，openid，昵称，头像
    console.log(that.data.iid);
    console.log(that.data.gid);
    console.log(that.data.goods_specification);
    console.log(that.data.checkedRadio);
    console.log(e.detail.value.estimate);
    
    if (e.detail.value.estimate == false) {
        wx.showModal({
          title: '小提示',
          content: '评价内容不能为空 :(',
          showCancel: false
        })
    } else if (wx.getStorageSync('openid') == false) {
      // 检测登录态 
      wx.showModal({
        title: '登录态失效',
        content: '请点击确定重新获取登录态!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/main/main'
            })
          }
        }
      })
    } else {

      // 友好体验开始
      wx.showLoading({
        title: '请求中',
      })

      // 请求首页数据（普通商品分类，普通商品）
      wx.request({
        url: App.data.domain + '/goods/estimate',
        data: {
          iid: that.data.iid,
          gid: that.data.gid,
          specification: that.data.goods_specification,
          status: that.data.checkedRadio,
          estimate: e.detail.value.estimate,
          openid: wx.getStorageSync('openid'),
          nickname: that.data.userInfo.nickName,
          avatarurl: that.data.userInfo.avatarUrl
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

          console.log(res.data);

          // res 
          if (res.data.code == 400) {

            wx.showModal({
              title: '请求失败',
              content: '请点击确定刷新页面!',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/main/main'
                  })
                }
              }
            })

          } else {

            wx.showModal({
              title: '请求成功',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/me/me'
                  })
                }
              }
            })

          }

        },
        fail: function (e) {
          console.log(e)
          wx.showModal({
            title: '网络错误',
            content: '请点击确定刷新页面!',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/main/main'
                })
              }
            }
          })
        }
      })

      // 友好体验结束
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)

    }

  }

})