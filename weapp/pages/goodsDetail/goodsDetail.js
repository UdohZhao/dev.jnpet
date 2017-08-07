// goodsDetail.js
var WxParse = require('../../dist/wxParse/wxParse.js')
//获取应用实例
var app = getApp()
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabs: ["商品详情", "商品评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    domain: app.data.domain,
    radioValue: 0,
    contactPathicon: '/dist/images/icon/service.png',
    cartPathicon: '/dist/images/icon/cart-default.png'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

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
      imgUrls: ['/dist/images/demo/TB2UzmCdOC9MuFjSZFoXXbUzFXa_!!1795846248.jpg_430x430q90.jpg', '/dist/images/demo/TB18dUFQXXXXXb1XFXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg','/dist/images/demo/TB1qEGBRXXXXXXuXXXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg']
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
   * 栏目切换事件
   */
  tabClick: function (e) {

    var that = this

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })

    console.log(e)

  },

  /**
   * 显示遮罩层
   */
  showModal: function () {
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
   * 确认加入购物车
   */
  addCartConfirm: function (e) {
    // 隐藏遮罩层
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
    }.bind(this), 200);

  },

  /**
   * 前往购物车
   */
  goCart: function (e) {
    wx.reLaunch({
      url: '/pages/cart/cart'
    })
  },

  /**
   * 联系商家
   */
  contactMerchant: function (e) {
    wx.makePhoneCall({
      phoneNumber: app.data.phone
    })
  }

})