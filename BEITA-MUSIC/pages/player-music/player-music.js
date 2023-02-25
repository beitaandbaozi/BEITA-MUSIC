import {
  getSongDetail,
  getSongLyric
} from '../../api/music/music'
import {
  beitaThrottle,
  parseLyric
} from '../../utils/common'

import playSongListStore from '../../store/paly-song-store'

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
    songLyric: [],
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
    sliderValue: 0,
    // 是否进行滑动操作
    isSliderChanging: false,
    // 当前歌曲载入的歌词
    currentLyric: '',
    // 当前歌曲歌词的索引,用来做优化
    currentLyricIndex: -1,
    // 当前歌词需要滚动的位置 ===> 配合scroll-view中的 scroll-top使用
    lyricScrollTop: 0,
    // 播放列表
    playSongList: [],
    // 当前歌曲在播放列表中的索引
    playSongIndex: -1
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
      const lrc = parseLyric(res.lrc.lyric)
      this.setData({
        songLyric: lrc
      })
    })

    // 播放歌曲
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 监听歌曲播放进度
    const throttle = beitaThrottle(this.updateProgress, 1000)
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging) {
        throttle()
      }
      // 1.动态计算当前显示的歌词
      if (!this.data.songLyric.length) return
      let index = this.data.songLyric.length - 1;
      for (let i = 0; i < this.data.songLyric.length; i++) {
        const info = this.data.songLyric[i]
        if (info.time > audioContext.currentTime * 1000) {
          // 说明是在前一句歌词，还没到这一句
          index = i - 1
          break
        }
      }
      // 防止同一时段同一时间更新同一句歌词
      if (index === this.data.currentLyricIndex) return;
      // 更新歌词
      // 更新歌词需要滚动位置   ===> 其中 35 是为每一句歌词设置的高度
      this.setData({
        currentLyric: this.data.songLyric[index].text,
        currentLyricIndex: index,
        lyricScrollTop: 35 * index
      })
    })
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      // 暂停时，调整进度时===> 不播放歌曲
      if (this.data.isPause) return;
      audioContext.play()
    })

    // 获取存放在仓库中的歌曲列表
    playSongListStore.onStates(['songList', 'songIndex'], this.handleGetPlaySongInfos)
  },
  // 歌曲播放响应
  updateProgress() {
    // 1.记录当前时间
    this.setData({
      currentTime: audioContext.currentTime * 1000
    })
    // 2.记录当前播放进度条
    const sliderValue = this.data.currentTime / this.data.durationTime * 100
    this.setData({
      sliderValue: sliderValue
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
  // 点进进度条调整音乐播放时间
  handleSliderChange(event) {
    const value = event.detail.value;
    // 计算当前的时间
    const currentTime = value / 100 * this.data.durationTime
    // 更新时间
    audioContext.seek(currentTime / 1000)
    this.setData({
      currentTime
    })
  },
  // 拖动进度条调整音乐播放时间
  handleSliderChanging(event) {
    const value = event.detail.value
    // 滑动此时不需要更改播放进度，而是松手之后才更改，所以不使用 audioContext.seek()
    // 由于 onTimeUpdate 一直都在运行 所以设置一个变量来控制一下
    const currentTime = value / 100 * this.data.durationTime
    this.setData({
      currentTime,
      isSliderChanging: true
    })
  },
  // 切换上一首歌曲
  handlePrevBtnMusic() {
    this.changeNextSong(false)
  },
  // 切换下一首
  handleNextBtnMusic() {
    this.changeNextSong()
  },
  // 切换歌曲(默认切换到下一首)
  changeNextSong(isNextSong = true) {
    // 1.获取当前歌曲所在的索引
    let index = this.data.playSongIndex
    const length = this.data.playSongList.length
    // 2.处理索引值
    index = isNextSong ? index + 1 : index - 1
    // 3.处理边界情况
    if (index === length - 1) index = 0
    if (index === -1) index = length - 1
    // 4.获取当前索引值在播放列表中的数据
    const newSong = this.data.playSongList[index]
    console.log('newSong', newSong)
    // 5.在store记录最新的索引
    playSongListStore.setState('songIndex', index)
  },
  // 获取仓库中的歌曲列表以及对应的索引
  handleGetPlaySongInfos({
    songList,
    songIndex
  }) {
    if (songList) {
      this.setData({
        playSongList: songList
      })
    }
    if (songIndex !== undefined) {
      this.setData({
        playSongIndex: songIndex
      })
    }
  },

  onUnload() {
    // 停止播放
    audioContext.stop()
    // 释放仓库中的数据
    playSongListStore.offStates(['songList', 'songIndex'], this.handleGetPlaySongList)
  }
})