// pages/main-profile/main-profile.js
Page({
  data: {
    // 是否已经登录
    isLogin: false,
    // 个人信息
    userInfo: {}
  },
  onLoad() {
    // 判断用户是否已经登录
    const userInfo = wx.getStorageSync('userInfo')
    const openId = wx.getStorageSync('openId')
    this.setData({
      isLogin: !!openId
    })
    if (this.data.isLogin) {
      this.setData({
        userInfo
      })
    }
  },
  //========================== 事件绑定 =========================
  // 登录
  async handleLogin() {
    // 1.发起请求获取用户信息
    const profileRes = await wx.getUserProfile({
      desc: '获取您的头像和昵称',
    })
    // 2.获取用户的openId
    const openIdRes = await wx.cloud.callFunction({
      name: 'music-login'
    })
    const openId = openIdRes.result.openid
    // 3.保存在本地
    wx.setStorageSync('userInfo', profileRes.userInfo)
    wx.setStorageSync('openId', openId)
    // 4.保存
    this.setData({
      isLogin: true,
      userInfo: profileRes.userInfo
    })
  }
})