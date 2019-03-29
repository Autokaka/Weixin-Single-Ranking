let QRCode = require("../../utils/qrCode.js").default;

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    qrtext:null
  },
  //单击生成二维码触发
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
  },
  onLoad: function () {
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
  }
})