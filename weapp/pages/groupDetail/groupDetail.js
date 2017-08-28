// groupDetail.js
var WxParse = require('../../dist/wxParse/wxParse.js');
//获取应用实例
var App = getApp();
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
    domain: App.data.domain,
    radioValue: 0,
    imgUrls: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    //调用应用实例的方法获取全局数据
    App.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    console.log(options);
    console.log(that.data.userInfo);

    // 获取商品id
    var gid = options.gid;

    // 友好体验开始
    wx.showLoading({
      title: '加载中',
    })

    // 请求商品详细信息
    wx.request({
      url: App.data.domain + '/goods/getInfo',
      data:{
        id: gid,
        type: 1
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
            gData: res.data.data,
            radioItems: res.data.data.specification,
            radioValue: res.data.data.specification[0].name
          })

          WxParse.wxParse('content', 'html', that.data.gData.content, that, 0);

          console.log(that.data.gData);
          console.log(that.data.radioItems);
          console.log(that.data.radioValue);

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
   * 显示遮罩层
   */
  showModal: function (e) {

    var that = this;

    // 获取购买类型
    console.log(e.currentTarget.dataset.buytype);

    that.setData({
      buytype: e.currentTarget.dataset.buytype
    });

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
    } else if (that.data.buytype == 1 && that.data.gData.ggData.type == 1) {
      // 验证拼团信息
      wx.showModal({
        title: '小提示',
        content: '参团人数已达到上限！',
        showCancel: false
      })
    } else if (that.data.buytype == 1) {

      // 请求拼团信息
      wx.request({
        url: App.data.domain + '/groupJoin/checkGroupInfo',
        data: {
          openid: wx.getStorageSync('openid'),
          ggid: that.data.gData.ggData.id
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
          } else if (res.data.code === 401) {
            wx.showModal({
              title: '小提示',
              content: res.data.msg,
              showCancel: false
            })
          } else {

            var animation = wx.createAnimation({
              duration: 200,
              timingFunction: "linear",
              delay: 0
            })
            that.animation = animation
            animation.translateY(300).step()
            that.setData({
              animationData: animation.export(),
              showModalStatus: true
            })
            setTimeout(function () {
              animation.translateY(0).step()
              that.setData({
                animationData: animation.export()
              })
            }.bind(that), 200)

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

      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      that.animation = animation
      animation.translateY(300).step()
      that.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }.bind(that), 200)
      
    }

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

    var that = this;

    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(that), 200);

    // 核心操作（获取选中的商品规格，购买数量）
    console.log(that.data.radioValue);
    console.log(that.data.num);
    console.log(wx.getStorageSync('openid'));
    console.log(that.data.gData.inventory);
    console.log(that.data.gData.id);

    var promotion_price; 

    // 购买数量不能大于库存
    if (parseInt(that.data.num) > parseInt(that.data.gData.inventory)) {
      wx.showModal({
        title: '错误提示',
        content: '当前购买数量已经超出库存!',
        showCancel: false
      })
    } else if (that.data.buytype == 1) {
      // 拼团购买
      promotion_price = that.data.gData.promotion_price;

      // 请求参团加入
      wx.request({
        url: App.data.domain + '/groupJoin/add/ggid/' + that.data.gData.ggData.id + '/openid/' + wx.getStorageSync('openid'),
        data: {
          nickname: that.data.userInfo.nickName,
          avatarurl: that.data.userInfo.avatarUrl
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
              title: '错误提示',
              content: res.data.msg,
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

            wx.request({
              url: App.data.domain + '/cart/add',
              data: {
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
                } else if (res.data.code === 401) {
                  wx.showModal({
                    title: '请求失败',
                    content: res.data.msg,
                    showCancel: false
                  })
                } else {

                  // 订单数据
                  console.log(res.data.data.cid);
                  console.log(that.data.gData.id);
                  console.log(that.data.gData.cname);
                  console.log(that.data.radioValue);
                  console.log(promotion_price);
                  console.log(that.data.num);

                  // 生成待付款订单
                  wx.request({
                    url: App.data.domain + '/indent/add/openid/' + wx.getStorageSync('openid') + '/itype/1',
                    data: {
                      cid: res.data.data.cid,
                      gid: that.data.gData.id,
                      cname: that.data.gData.cname,
                      specification: that.data.radioValue,
                      promotion_price: promotion_price,
                      quantity: that.data.num,
                      buytype: that.data.buytype,
                      ggid: that.data.gData.ggData.id
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {

                      // if 
                      if (res.data.code == 400) {
                        wx.showModal({
                          title: '结算错误',
                          content: res.data.msg,
                          showCancel: false
                        })

                      } else {

                        // 前往订单页面
                        wx.navigateTo({
                          url: '/pages/closeAnAccount/closeAnAccount?iid=' + res.data.data.iid
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
      
      // 单独购买
      promotion_price = that.data.gData.original_price;

      // 友好体验开始
      wx.showLoading({
        title: '请求中',
      })

      wx.request({
        url: App.data.domain + '/cart/add',
        data: {
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
          } else if (res.data.code === 401) {
            wx.showModal({
              title: '请求失败',
              content: res.data.msg,
              showCancel: false
            })
          } else {

            // 订单数据
            console.log(res.data.data.cid);
            console.log(that.data.gData.id);
            console.log(that.data.gData.cname);
            console.log(that.data.radioValue);
            console.log(promotion_price);
            console.log(that.data.num);

            // 生成待付款订单
            wx.request({
              url: App.data.domain + '/indent/add/openid/' + wx.getStorageSync('openid') + '/itype/0',
              data: {
                cid: res.data.data.cid,
                gid: that.data.gData.id,
                cname: that.data.gData.cname,
                specification: that.data.radioValue,
                promotion_price: promotion_price,
                quantity: that.data.num
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {

                // if 
                if (res.data.code == 400) {
                  wx.showModal({
                    title: '结算错误',
                    content: res.data.msg,
                    showCancel: false
                  })

                } else {

                  // 前往订单页面
                  wx.navigateTo({
                    url: '/pages/closeAnAccount/closeAnAccount?iid=' + res.data.data.iid
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