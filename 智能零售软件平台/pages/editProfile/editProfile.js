//app变量->当前小程序
const app = getApp()

Page({
  /**
   * 初始化数据
   */
  data: {
    hideModal: true,  //模态框的状态  true-隐藏  false-显示
    animationData: {},//
    sex: null,        //性别
    nickName: null,   //昵称
    adress: null,     //家庭住址
    avatarUrl: null   //头像地址
  },
  /**
   * 显示选项
   */
  showOptions: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },
  /**
   * 隐藏遮罩层
   */
  hideOptions: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块
  },

  /**
   * 动画集
   */
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },

  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.hasUserInfo==false) {
      console.log("用户未登录!!");
    }else{
      //设置属性
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      })
      //设置性别
      if (app.globalData.userInfo.gender == 0){
        this.setData({sex:"null"});
      } else if (app.globalData.userInfo.gender == 1) {
        this.setData({ sex: "男" });
      } else if (app.globalData.userInfo.gender == 2) {
        this.setData({ sex: "女" });
      }
    }
  }
})
