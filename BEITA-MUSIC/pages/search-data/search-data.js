import {
  getSearchData
} from '../../api/search/search'
import playSongListStore from '../../store/paly-song-store'

Page({
  data: {
    // 搜索值
    keywords: '',
    // 搜索结果
    searchDataList: [],
    // 偏移量 ====> 分页加载
    offset: 0,
    // 是否已经加载完毕
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const keywords = options.keywords
    this.setData({
      keywords
    })
    this.fetchSearchData(keywords, this.data.offset)
  },

  // ========================== 事件响应 ==========================
  async fetchSearchData(keywords, offset) {
    // 0. 特殊处理
    let songs = []
    // 1. 获取数据
    const res = await getSearchData(keywords, offset)
    // 2. 拼接数据
    if (!Object.keys(res.result).length) {
      songs = []
      this.data.hasMore = true
    } else {
      songs = res.result.songs
      this.data.hasMore = res.result.hasMore
    }
    const newSearchData = [...this.data.searchDataList, ...songs]
    this.setData({
      searchDataList: newSearchData
    })
    // 3. 更改offset的值
    this.data.offset = this.data.searchDataList.length

  },
  // 上拉加载
  onReachBottom() {
    // 加载完成就不需要加载数据了
    if (!this.data.hasMore) return
    this.fetchSearchData(this.data.keywords, this.data.offset)
  },
  // 下拉刷新
  async onPullDownRefresh() {
    // 1. 重置数据
    this.data.hasMore = true
    this.data.offset = 0
    this.data.searchDataList = []
    // 2. 重新加载数据
    await this.fetchSearchData(this.data.keywords, this.data.offset)
    // 3.等数据加载完成立即关闭下拉刷新的状态  ====> await 阻塞作用
    wx.stopPullDownRefresh()
  },
  // 点击跳转到播放器进行仓库存储操作
  handleToPlayer(event) {
    const index = event.currentTarget.dataset.index
    playSongListStore.setState('playSongList', this.data.searchDataList)
    playSongListStore.setState('playSongListIndex', index)
    console.log('====')
  }

})