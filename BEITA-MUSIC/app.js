App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    // 设备状态栏高度
    statusHeight: 20,
    // 自定义导航栏高度
    defineNavBarHeight: 44,
    // 内容高度----> 播放器轮播图高度动态计算
    contentHeight: 500
  },
  onLaunch() {
    // 获取屏幕宽度和高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - this.globalData.defineNavBarHeight
      }
    })
    // 注册云开发
    // wx.cloud.init()
  }
})