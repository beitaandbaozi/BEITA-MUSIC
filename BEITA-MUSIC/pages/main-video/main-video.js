import {
  getTopMvList
} from '../../api/video/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    // 偏移量
    offset: 0,
    // 是否已经全部加载完成
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllVedio()
  },

  // 获取所有的视频数据
  async getAllVedio() {
    // 1.获取数据
    const res = await getTopMvList(20,this.data.offset)
    // 2.拼接之前的数据
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({
      videoList: newVideoList
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },

  // 上拉加载
  onReachBottom() {
    // 如果已经全部加载完成，就不去请求
    if(!this.data.hasMore) return;
    this.getAllVedio()
  }
})