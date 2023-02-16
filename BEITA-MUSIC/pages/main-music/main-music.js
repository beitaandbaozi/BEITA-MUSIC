import {
  getBunnerList
} from '../../api/music/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索词
    searchValue: '',
    // 轮播图数据
    bannerList: []
  },
  onLoad() {
    this.featchData()
  },
  // 获取页面请求数据
  featchData() {
    // 获取轮播图数据
    getBunnerList().then(res => {
      this.setData({
        bannerList: res.banners
      })
    })
  },
  // 点击搜索框跳转到搜索页面
  handleToSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  }
})