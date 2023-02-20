import {
  getSongDetail,
  getSongLyric
} from '../../api/music/music'

const app = getApp()
// 创建播放器
const audioContext = wx.createInnerAudioContext()
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
    swiperHeight: 500,
    // 导航栏标题
    pageNavTitle: ['歌曲', '歌词'],
    // 歌曲是否暂停
    isPause: false,
    // 当前歌曲播放到的时间
    currentTime: 0,
    // 歌曲总时间
    durationTime: 0,
    // 进度条   ===> （当前播放的时间/总时间） * 100
    sliderValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递过来的id值  ===> 根据id值获取歌曲详情和歌词
    const {
      id
    } = options
    // 更改轮播图高度
    this.setData({
      swiperHeight: app.globalData.contentHeight
    })
    // 获取歌曲详情信息
    getSongDetail(id).then(res => {
      this.setData({
        songDetail: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })
    // 获取歌词信息
    getSongLyric(id).then(res => {
      this.setData({
        songLyric: res.lrc.lyric
      })
    })

    // 播放歌曲
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 监听歌曲播放进度
    audioContext.onTimeUpdate(() => {
      // 1.记录当前时间
      this.setData({
        currentTime: audioContext.currentTime * 1000
      })
      // 2.记录当前播放进度条
      const sliderValue = this.data.currentTime / this.data.durationTime * 100
      this.setData({
        sliderValue: sliderValue
      })
    })
  },
  // 轮播切换响应
  handleSwiperChange(event) {
    this.setData({
      currentPage: event.detail.current
    })
  },
  // 点击标题，切换轮播图页面
  onNavTabItemTap(event) {
    const id = event.currentTarget.dataset.index
    this.setData({
      currentPage: id
    })
  },
  // 暂停和播放音乐
  toggleMusicStatus() {
    if (!this.data.isPause) {
      audioContext.pause()
      this.setData({
        isPause: true
      })
    } else {
      audioContext.play()
      this.setData({
        isPause: false
      })
    }
  },
  onUnload() {
    // 停止播放
    audioContext.stop()
  }
})