import {
  getSongDetail,
  getSongLyric
} from '../../api/music/music'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌曲内容
    songDetail: {},
    // 歌词内容
    songLyric: '',
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