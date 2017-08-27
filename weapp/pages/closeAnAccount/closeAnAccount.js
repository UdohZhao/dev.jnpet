// closeAnAccount.js
//获取应用实例
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: App.data.domain,
    addressTips: '请选择',
    postage: 0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.iid);

    var that = this;

    // 获取订单id
    var iid = options.iid;

    that.setData({
      iid: iid
    });

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    // 请求订单数据
    wx.request({
      url: App.data.domain + '/indent/index',
      data: {
        id: that.data.iid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data);

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
            iData: res.data.data
          })

          console.log(that.data.iData)

          // 立即支付提示
          if (that.data.iData.type == 0 && that.data.iData.status == 1) {
            wx.showModal({
              title: '小提示',
              content: '请您在30分钟内完成支付 :)',
              showCancel: false
            })
          }

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
   * 收货地址
   */
  newlyIncreased: function (e) {
    var that = this
    wx.chooseAddress({
      success: function (res) {

        console.log(res);

        that.setData({
          addressData: res,
          addressTips: res.userName + '-' + res.telNumber
        })

      }

    })
  },

  /**
   * 买家留言
   */
  message: function (e) {

    var that = this
    that.setData({
      message: e.detail.value
    });

  },

  /**
   * 提交订单
   */
  submitIndent: function (e) {

    var that = this;

    console.log(that.data.iid);
    console.log(that.data.addressData);
    console.log(that.data.message);

    // if 
    if (that.data.addressData == undefined) {
      wx.showModal({
        title: '错误提示',
        content: '请选择收货地址 :(',
        showCancel: false
      })
    } else {

      // 友好体验开始
      wx.showLoading({
        title: '提交中',
      })

      // 请求订单数据
      wx.request({
        url: App.data.domain + '/indent/add/id/' + that.data.iid,
        data: {
          contacts: that.data.addressData.userName,
          phone: that.data.addressData.telNumber,
          address: that.data.addressData.provinceName + that.data.addressData.cityName + that.data.addressData.countyName + that.data.addressData.detailInfo,
          postal_code: that.data.addressData.postalCode,
          message: that.data.message
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {

          console.log(res.data);

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

            wx.reLaunch({
              url: '/pages/closeAnAccount/closeAnAccount?iid=' + res.data.data.iid
            });

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
   * 立即支付
   */
  iPay: function (e) {

    var that = this;

    // 获取订单id，支付金额
    console.log(that.data.iid); 
    console.log(that.data.iData.total_money); 

    // 友好体验开始
    wx.showLoading({
      title: '请求中',
    })

    // 请求支付是否超时
    wx.request({
      url: App.data.domain + '/indent/checkTimeout',
      data: {
        id: that.data.iid,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data);

        // if 
        if (res.data.code == 400) {

          wx.showModal({
            title: '支付提示',
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

        } else {

          console.log('发起支付流程');

          // 请求微信支付统一下单
          wx.request({
            url: App.data.domain + '/indent/wxPay',
            data: {
              id: that.data.iid,
              openid: wx.getStorageSync('openid'),
              iprice: wx.getStorageSync('iprice'),
              price: wx.getStorageSync('price')
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {

              console.log(res.data);

              // 获取微信统一下单返回的结果
              var jsApiParameters = JSON.parse(res.data);

              // 发起微信支付
              wx.requestPayment({
                'timeStamp': jsApiParameters.timeStamp,
                'nonceStr': jsApiParameters.nonceStr,
                'package': jsApiParameters.package,
                'signType': jsApiParameters.signType,
                'paySign': jsApiParameters.paySign,
                'success': function (res) {

                  // 移除优惠券信息
                  wx.removeStorageSync('iprice');
                  wx.removeStorageSync('price');

                  wx.showModal({
                    title: '支付提示',
                    content: '支付成功 :)',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: '/pages/me/me'
                        })
                      }
                    }
                  })

                },
                'fail': function (res) {

                  wx.showModal({
                    title: '支付提示',
                    content: '您取消了支付 :(',
                    showCancel: false
                  })

                }
              })

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


})