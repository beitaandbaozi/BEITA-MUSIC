import {
  getTopMvList
} from '../../api/video/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllVedio()
  },

  // 获取所有的视频数据
  async getAllVedio() {
    const res = await getTopMvList()
    this.setData({
      videoList: res.data
    })
  },
})