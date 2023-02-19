import {
  getSongDetail,
  getSongLyric
} from '../../api/music/music'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌曲内容
    songDetail: {},
    // 歌词内容
    songLyric: '',
    // 当前的页面，用于切换导航栏
    currentPage: 0,
    // 轮播图高度---> 由于导航的自定义，需要动态计算
    swiperHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递过来的id值  ===> 根据id值获取歌曲详情和歌词
    const {
      id
    } = options
    this.fetchData(id)
  },
  fetchData(id) {
    // 更改轮播图高度
    this.setData({
      swiperHeight: app.globalData.contentHeight
    })
    // 获取歌曲详情信息
    getSongDetail(id).then(res => {
      this.setData({
        songDetail: res.songs[0]
      })
    })
    // 获取歌词信息
    getSongLyric(id).then(res => {
      this.setData({
        songLyric: res.lrc.lyric
      })
    })
  },
  // 轮播切换响应
  handleSwiperChange(event) {
    this.setData({
      currentPage: event.detail.current
    })
  }
})