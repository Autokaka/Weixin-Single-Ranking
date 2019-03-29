//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  editProfile: function () {
    if (app.globalData.hasUserInfo == false) {
      //弹窗提示登录
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../editProfile/editProfile'
      })
    }
  },
  
  history: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  },

  onLoad: function () {
    if (app.globalData.hasUserInfo) {
      app.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          app.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //局部变量赋值
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },

  getUserInfo: function (e) {
    console.log("登录");
    // 登录
    wx.login({
      success: function (res) {
        //获取登录code= res.code
        if (res.code) {
          console.log("正在获取openid...")
          //发起网络请求,相等于jq的ajax
          wx.request({
            url: 'https://dogshitpiestudio.cn/wxApp/index.php', //你服务器code.php文件地址，默认GET。小程序只支持https ，
            data: {
              code: res.code
            },
            //为了自身应用安全，获取的openid和session_key不应该在网络上传输，所以不设置成功回调，可以服务器直接加密存数据库
            success: function (v) {
              console.log(v)
              app.globalData.openid = v.data.openid
              console.log("app.globalData.openid: " + app.globalData.openid)
              console.log("openid获取成功！")
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    //全局变量
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.hasUserInfo = true;
    //局部变量
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
    console.log("登录成功,全局信息赋值完成");
  }
})
