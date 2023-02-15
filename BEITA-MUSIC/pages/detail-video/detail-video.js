import {
  fetchRecommendMvById,
  fetchMvInfoById,
  fetchMvUrlById
} from '../../api/video/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 路由传递过来的视频Id
    id: 0,
    // MV播放地址
    mvUrl: '',
    // MV的基本信息
    mvInfo: {},
    // 相关视频
    recommendList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      id
    } = options
    this.setData({
      id
    })

    this.getMvDataById(this.data.id)
  },
  // 获取MV页面对应的数据
  getMvDataById(id) {
    // 根据视频id获取对应的MV地址
    fetchMvUrlById(id).then(res => {
      this.setData({
        mvUrl: res.data.url
      })
    })
    // 根据视频id获取对应的MV信息
    fetchMvInfoById(id).then(res => {
      this.setData({
        mvInfo: res.data
      })
    })
    // 根据视频id获取对应的推荐视频
    fetchRecommendMvById(id).then(res => {
      this.setData({
        recommendList: res.data
      })
    })
  },
})