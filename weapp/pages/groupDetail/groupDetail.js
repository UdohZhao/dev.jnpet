// groupDetail.js
var WxParse = require('../../dist/wxParse/wxParse.js');
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    domain: app.data.domain,
    radioValue: 0,
    imgUrls: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this
    that.setData({
      imgUrls: ['/dist/images/demo/TB2UzmCdOC9MuFjSZFoXXbUzFXa_!!1795846248.jpg_430x430q90.jpg', '/dist/images/demo/TB18dUFQXXXXXb1XFXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', '/dist/images/demo/TB1qEGBRXXXXXXuXXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg']
    })
  
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
   * 单独购买
   */
  aloneBuy: function (e) {
    wx.showToast({
      title: '单独购买',
      icon: 'loading',
      duration: 3000
    });
  },

  /**
   * 团体购买
   */
  teamBuy: function (e) {
    wx.showToast({
      title: '团体购买',
      icon: 'loading',
      duration: 3000
    });
  },

  /**
   * 显示遮罩层
   */
  showModal: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  /**
   * 隐藏遮罩层
   */
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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
      radioValue: e.detail.value
    });
  },

  /**
   * 点击减号
   */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  /**
   * 点击加号
   */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  /**
   * 输入框事件
   */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },

  /**
   * 购买
   */
  buyBtn: function (e) {

    console.log(e)

  }

})