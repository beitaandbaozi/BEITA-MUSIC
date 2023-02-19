// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    // 设备状态栏高度
    statusHeight: 20
  },
  onLaunch() {
    // 获取屏幕宽度和高度
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.screenHeight = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
      }
    })
  }
})