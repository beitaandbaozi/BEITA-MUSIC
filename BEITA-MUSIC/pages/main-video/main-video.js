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
    const res = await getTopMvList(20, this.data.offset)
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
    if (!this.data.hasMore) return;
    this.getAllVedio()
  },

  // 下拉刷新
  async onPullDownRefresh() {
    // 1.清空之前的数据
    this.data.videoList = []
    this.data.offset = 0
    this.data.hasMore = true

    // 使用this.setData({})改了js文件里面的data的值,页面中用到这个值的地方也会一起自动更换了,页面自动显示最新数据
    // this.setData({
    //   videoList:[],
    //   offset:0,
    //   hasMore:true
    // })
    // 2.重新请求数据
    await this.getAllVedio()
    // 3.等数据加载完成立即关闭下拉刷新的状态  ====> await 阻塞作用
    wx.stopPullDownRefresh()
  }
})