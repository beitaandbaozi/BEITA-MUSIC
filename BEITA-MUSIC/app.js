// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667
  },
  onLaunch() {
    // 获取屏幕宽度和高度
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenHeight = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
      }
    })
  }
})