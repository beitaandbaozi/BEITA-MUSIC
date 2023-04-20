import {
  getHotSearchData
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
    isPlaying: false,
    // tap
    tapGroup: [{
        type: 'singer',
        name: '歌手'
      },
      {
        type: 'sing',
        name: '曲风'
      },
      {
        type: 'mv',
        name: 'MV'
      },
      {
        type: 'area',
        name: '专区'
      }
    ]
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
  fetchSearch(keywords) {
    if (keywords.length === 0) return wx.showToast({
      title: '内容不能为空',
    })
    // 跳转到详情页
    wx.navigateTo({
      url: `/pages/search-data/search-data?keywords=${keywords}`,
    })
  },
  // 点击搜索
  handleSearch() {
    const keywords = this.data.searchValue
    this.fetchSearch(keywords)
    this.setData({
      searchValue: ""
    })
  },
  // 点击猜你喜欢中的数据，进行搜索
  handleToSearch(event) {
    const keywords = event.currentTarget.dataset.keywords
    this.fetchSearch(keywords)
  },
  // 歌手、曲风、MV、专区点击跳转
  handleToTapDetail(event) {
    // 获取对应的分类
    // 0：歌手  1：曲风  2：MV 3：专区
    const type = event.currentTarget.dataset.type
    switch (type) {
      case 0:
        wx.navigateTo({
          url: '/pages/search-singer-detail/search-singer-detail',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/search-sing-detail/search-sing-detail',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/search-mv-detail/search-mv-detail',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/search-area-detail/search-area-detail',
        })
        break;
      default:
        break;
    }
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