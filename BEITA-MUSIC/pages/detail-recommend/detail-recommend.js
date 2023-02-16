import recommendStore from '../../store/recommend-store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从仓库获取数据
    recommendStore.onState("recommendMusicInfo", (value) => {
      this.setData({
        musicList: value
      })
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    recommendStore.offState("recommendMusicInfo", (value) => {
      this.setData({
        musicList: value
      })
    })
  }
})