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
    // 目前设备的状态栏高度
    statusHeight: 20
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
    // 自定义导航-撑起的设备栏高度
    this.setData({
      statusHeight: app.globalData.statusHeight
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
  }

})