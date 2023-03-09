import {
  getHotSearchData,
  getSearchData
} from '../../api/search/search'
import playSongListStore from '../../store/paly-song-store'
Page({
  data: {
    // 搜索词
    searchValue: '',
    // 热门搜索列表
    hotSearchDataList: [],
    // 当前播放的歌曲
    currentSong: {},
    // 播放状态
    isPlaying: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取热门搜索数据
    this.fetchHostSearchData()
    // 获取当前正在播放的歌曲
    playSongListStore.onStates(['songDetail', 'isPlaying'], this.handleGetPlaySongInfos)
  },
  // ======================= 事件响应 ===================
  // 获取热门搜索数据
  fetchHostSearchData() {
    getHotSearchData().then(res => {
      this.setData({
        hotSearchDataList: res.result.hots
      })
    })
  },
  // 搜索功能
  handleSearch() {
    // 搜索的内容
    const keywords = this.data.searchValue;
    getSearchData(keywords).then(res => {
      console.log(res)
    })
  },
  // =========================== store事件 ================
  handleGetPlaySongInfos({
    songDetail,
    isPlaying
  }) {
    if (songDetail) {
      this.setData({
        currentSong: songDetail
      })
    }
    if (isPlaying !== undefined) {
      this.setData({
        isPlaying
      })
    }
  },
  onUnload() {
    playSongListStore.offStates(['songDetail', 'isPlaying'], this.handleGetPlaySongInfos)
  }

})