// goodsDetail.js
var WxParse = require('../../dist/wxParse/wxParse.js')
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置
//获取应用实例
var App = getApp()
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
    domain: App.data.domain,
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

    //调用应用实例的方法获取全局数据
    App.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    // 获取商品id
    var gid = options.gid;

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    // 请求商品详细信息
    wx.request({
      url: App.data.domain + '/goods/getInfo/id/'+gid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // if 
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

          // 赋值
          that.setData({
            gData: res.data.data,
            dcData: res.data.data.dcData,
            radioItems: res.data.data.specification,
            radioValue: res.data.data.specification[0].name
          })

         
          WxParse.wxParse('content', 'html', that.data.gData.content, that, 0);

          console.log(that.data.gData) 

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
   * 栏目切换事件
   */
  tabClick: function (e) {

    var that = this

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })

    console.log(that.data.activeIndex);

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    
    if (that.data.activeIndex == 1) {
      // 请求商品评价数据
      wx.request({
        url: App.data.domain + '/goodsEstimate/getData/gid/' + that.data.gData.id,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          
          console.log(res.data);

          that.setData({
            geData: res.data.data
          });

          console.log(that.data.geData);

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
    }

    // 友好体验结束
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

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
    var that = this;
    var radioItems = that.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    that.setData({
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

    var that = this;

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

    // 核心操作（获取选中的商品规格，购买数量）
    console.log(that.data.radioValue);
    console.log(that.data.num);
    console.log(wx.getStorageSync('openid'));
    console.log(that.data.gData.inventory);
    console.log(that.data.gData.id);

    // 检测登录态 
    if (wx.getStorageSync('openid') == false) {
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
    } else if (parseInt(that.data.num) > parseInt(that.data.gData.inventory)) {
      wx.showModal({
        title: '错误提示',
        content: '当前购买数量已经超出库存!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log(res)
          }
        }
      })
    } else {

      // 友好体验开始
      wx.showLoading({
        title: '加入购物车中',
      })

      wx.request({
        url: App.data.domain + '/cart/add',
        data:{
          openid: wx.getStorageSync('openid'),
          specification: that.data.radioValue,
          quantity: that.data.num,
          gid: that.data.gData.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {

          // if 
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
          } else if (res.data.code === 401) {
            wx.showModal({
              title: '请求失败',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log(res);
                }
              }
            })
          } else {
            wx.showModal({
              title: '请求成功',
              content: res.data.msg,
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '/pages/cart/cart'
                  })
                } else {
                  console.log('用户点击了取消');
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
      phoneNumber: App.data.phone
    })
  },

  /**
   * 优惠券
   */
  discountCoupon: function (e) {

    console.log(e.currentTarget.dataset.iprice, e.currentTarget.dataset.price);

    // 领取信息
    wx.showModal({
      title: '领券通知',
      content: '您本次领取订单满' + e.currentTarget.dataset.iprice + '立减' + e.currentTarget.dataset.price+' ~（注：多次领取将覆盖）',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
         // 优惠券信息存入本地缓存
          wx.setStorageSync('iprice', e.currentTarget.dataset.iprice);
          wx.setStorageSync('price', e.currentTarget.dataset.price);
        }
      }
    })

  }

})