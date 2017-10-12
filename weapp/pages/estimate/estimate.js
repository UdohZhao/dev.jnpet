// estimate.js
//获取应用实例
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: App.data.domain
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    // 获取订单id
    console.log(options.iid);

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    // 请求订单商品数据
    wx.request({
      url: App.data.domain + '/indentGoods/index',
      data: {
        iid: options.iid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data);

        // 赋值
        that.setData({
          igData: res.data.data
        })

        console.log(that.data.igData)

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
   * 立即评价
   */
  estimate: function (e) {

    // 获取订单id，商品id，商品规格
    console.log(e.currentTarget.dataset.iid);
    console.log(e.currentTarget.dataset.gid);
    console.log(e.currentTarget.dataset.goods_specification);

    // 前往商品评价详细
    wx.navigateTo({
      url: '/pages/estimateDetail/estimateDetail?iid=' + e.currentTarget.dataset.iid + '&gid=' + e.currentTarget.dataset.gid + '&goods_specification=' + e.currentTarget.dataset.goods_specification
    });
    
  }

})