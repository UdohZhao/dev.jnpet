// indent.js
//获取应用实例
var App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: App.data.domain,
    technicalSupport: App.data.technicalSupport,
    iData: ['1','2','3'],
    itgData: ['1','2','3']
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    // 获取订单类型
    console.log(options);

    that.setData({
      itype: options.itype
    });

    // 登录态
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
    } else {

      // 友好体验开始
      wx.showLoading({
        title: '加载中',
      })

      // 请求订单列表数据
      wx.request({
        url: App.data.domain + '/indent/indexAll',
        data: {
          itype: that.data.itype,
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
              title: '小提示',
              content: res.data.msg,
              showCancel: false
            })

            // 赋值
            that.setData({
              iData: res.data.data
            })

            console.log(that.data.iData)


          } else {

            // 赋值
            that.setData({
              iData: res.data.data
            })

            console.log(that.data.iData)

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
   * 立即完善
   */
  perfect: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    wx.navigateTo({
      url: '/pages/closeAnAccount/closeAnAccount?iid=' + e.currentTarget.dataset.id
    })

  },

  /**
   * 立即付款
   */
  iPay: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    wx.navigateTo({
      url: '/pages/closeAnAccount/closeAnAccount?iid=' + e.currentTarget.dataset.id
    })

  },

  /**
   * 取消订单
   */
  coo: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    // 确认框
    wx.showModal({
      title: '确认取消订单吗？',
      content: '取消后将不可恢复 :(',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {

          // 请求取消订单
          wx.request({
            url: App.data.domain + '/indent/coo',
            data: {
              id: e.currentTarget.dataset.id,
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
         
        } else {
          console.log('用户点击了取消');
        }
      }
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
   * 确认收货
   */
  tdog: function (e) {

    console.log(e);

    // 确认框
    wx.showModal({
      title: '确认收货吗？',
      content: '确定后将不可修改 :(',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {

          // 请求收货
          wx.request({
            url: App.data.domain + '/indent/tdog',
            data: {
              id: e.currentTarget.dataset.id
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

        } else {
          console.log('用户点击了取消');
        }
      }
    })

  },

  /**
   * 立即评价
   */
  estimate: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    wx.navigateTo({
      url: '/pages/estimate/estimate?iid=' + e.currentTarget.dataset.id
    });

  },

  /**
   * 进入售后
   */
  afterSale: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    wx.showModal({
      title: '小提示',
      content: '确认商品都评价了吗？',
      success: function (res) {
        if (res.confirm) {

          // 请求进入售后
          wx.request({
            url: App.data.domain + '/indent/afterSale',
            data: {
              id: e.currentTarget.dataset.id
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
   * 申请退款
   */
  refund: function (e) {

    // 获取订单id
    console.log(e.currentTarget.dataset.id);

    wx.showModal({
      title: '小提示',
      content: '确认申请退款吗？',
      success: function (res) {
        if (res.confirm) {

          // 请求退款
          wx.request({
            url: App.data.domain + '/indent/refund',
            data: {
              id: e.currentTarget.dataset.id
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

})