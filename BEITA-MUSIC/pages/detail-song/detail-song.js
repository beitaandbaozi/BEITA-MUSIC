import rankingStore from '../../store/ranking-store'
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    musicList: []
  },
  onLoad(options) {
    // 通过路由中的type来判断展示对应的数据
    // recommend 推荐歌曲    ranking 巅峰榜歌曲
    const {
      type,
      key
    } = options
    this.data.type = type
    this.data.key = key
    if (type === 'ranking') {
      rankingStore.onState(key, this.handleStoreCallback)
    }

  },
  handleStoreCallback(value) {
    this.setData({
      musicList: value
    })
    // 设置导航标题
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  onUnload() {
    rankingStore.offState(this.data.key, this.handleStoreCallback)
  }
})