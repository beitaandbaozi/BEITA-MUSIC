import playSongListStore from '../../store/paly-song-store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当播放的歌曲信息
    currentSong: {
      type: Object,
      value: () => {}
    },
    // 播放状态
    isPlaying: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 播放欄中，切換歌曲的播放狀態
    toggleCurrentPlayStatus() {
      playSongListStore.dispatch('changeMusicStatusAction')
    },
    // 點擊播放欄，跳轉到播放器頁面
    handleToPlayer() {
      wx.navigateTo({
        url: '/packagePlayer/pages/player-music/player-music',
      })
    }
  }
})