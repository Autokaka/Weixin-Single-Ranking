//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},//未登录时初始化userInfo为空，并标记userInfo为空
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')//判断控件能否使用
  },
  //事件处理函数
  bindViewTap: function() {//点击圆形按钮登录以后，跳转到log页，查看启动日志
    wx.navigateTo({
      url: '../modPI/modPI'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.userInfo)
  }
})
