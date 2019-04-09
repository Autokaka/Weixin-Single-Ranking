// pages/index.js
let QRCode = require("../../utils/qrCode.js").default;
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrtext: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取手机信息
    let sysinfo = wx.getSystemInfoSync();
    console.log("检测手机详细信息...")
    console.log(sysinfo)
    console.log("手机信息检测完毕!")
    let qrcode = new QRCode('qrcode', {
      text: '',
      //获取手机屏幕的宽和长  进行比例换算
      width: sysinfo.windowWidth * 660 / 750,
      height: sysinfo.windowWidth * 660 / 750,
      //二维码底色尽量为白色， 图案为深色
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.correctLevel.H
    });
    //将一个局部变量共享
    this.QR = qrcode;
    this.createQRcode();
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
   * 单击生成二维码触发
   */
  createQRcode: function () {
    if (app.globalData.openid != null) {
      this.data.qrtext = app.globalData.openid;
      console.log("qrtext: " + this.data.qrtext)
      console.log("正在生成二维码...")
      this.QR.clear();
      this.QR.makeCode(this.data.qrtext);
      console.log("二维码生成完毕！")
    }
    else {
      console.log("亲，请先登录哟~")
    }
  }
})