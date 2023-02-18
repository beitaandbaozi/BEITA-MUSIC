import rankingStore from '../../store/ranking-store'
import recommendStore from '../../store/recommend-store'
import {
  getRecommendList
} from '../../api/music/music'
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    musicList: [],
    // 因为推荐歌单的接口其实是我接了热门歌单的 所以用一个变量来替代本来的名称
    titleName: '',
    // 歌单详情的id
    id: -1
  },
  onLoad(options) {
    // 通过路由中的type来判断展示对应的数据
    // recommend 推荐歌曲    ranking 巅峰榜歌曲
    const {
      type,
      key,
      id
    } = options
    this.setData({
      type: type
    })
    // 巅峰榜
    if (type === 'ranking') {
      this.data.key = key
      rankingStore.onState(key, this.handleStoreCallback)
    }
    // 推荐歌曲 
    else if (type === 'recommend') {
      this.data.titleName = '推荐歌曲'
      recommendStore.onState("recommendMusicInfo", this.handleStoreCallback)
    }
    // 热门歌单、推荐歌单
    else if (type === 'menu') {
      this.data.id = id
      this.data.title = '歌单'
      getRecommendList(id).then(res => {
        this.setData({
          musicList: res.playlist
        })
      })
      wx.setNavigationBarTitle({
        title: this.data.title,
      })
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