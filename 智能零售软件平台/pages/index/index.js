let QRCode = require("../../utils/qrCode.js").default;

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    qrtext: app.globalData.openid
  },
  //单击生成二维码触发
  createQRcode: function () {

    //!!!!!!!!!!!测试性赋值，拥有有效域名后删去此行!!!!!!!!!!
    this.setData({qrtext: "hi~"})

    console.log("qrtext: " + this.data.qrtext)
    this.QR.clear();
    this.QR.makeCode(this.data.qrtext);
  },
  onLoad: function () {
    // console.log(QRCode);
    // 获取手机信息
    let sysinfo = wx.getSystemInfoSync();
    console.log(sysinfo)
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
  }
})