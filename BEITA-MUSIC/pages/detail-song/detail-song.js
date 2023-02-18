import rankingStore from '../../store/ranking-store'
import recommendStore from '../../store/recommend-store'
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    musicList: [],
    // 因为推荐歌单的接口其实是我接了热门歌单的 所以用一个变量来替代本来的名称
    titleName: ''
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
    } else if (type === 'recommend') {
      this.data.type = type
      this.data.titleName = '推荐歌曲'
      recommendStore.onState("recommendMusicInfo", this.handleStoreCallback)
    }

  },
  handleStoreCallback(value) {
    this.setData({
      musicList: value
    })
    // 设置导航标题
    if (this.data.type === 'recommend') value.name = "推荐歌曲"
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleStoreCallback)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState("recommendMusicInfo", this.handleStoreCallback)
    }

  }
})