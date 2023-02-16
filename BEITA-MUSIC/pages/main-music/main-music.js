// pages/main-music/main-music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索词
    searchValue: ''
  },

  // 点击搜索框跳转到搜索页面
  handleToSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  }
})