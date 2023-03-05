import rankingStore from '../../store/ranking-store'
import recommendStore from '../../store/recommend-store'
import playSongListStore from '../../store/paly-song-store'
import menuStore from '../../store/menu-store'

import {
  getRecommendList
} from '../../api/music/music'
import {
  database,
  menuCollection
} from '../../database/index'
// 连接数据库
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    musicList: {},
    // 因为推荐歌单的接口其实是我接了热门歌单的 所以用一个变量来替代本来的名称
    titleName: '',
    // 歌单详情的id
    id: -1,
    // 歌单列表
    menuList: []
  },
  onLoad(options) {
    // 获取仓库中的歌单数据
    menuStore.onState("menuList", this.handleMenuStore)

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
    // 我的收藏、我的喜欢、历史记录
    else if (type === 'profile') {
      const colName = options.tabname
      const title = options.title
      this.handleProfileTabInfo(colName, title)
    }
    // 用户歌单
    else if (type === 'profileMenu') {
      const _id = options.id
      this.handleProfieMenuInfo(_id)
    }
  },
  // 处理个人中心歌单数据 ===> 详情页
  handleProfieMenuInfo(id) {
    // 通过id筛选出具体的歌单
    const menuItem = this.data.menuList.filter(item => item._id === id)
    // 针对数据拼接musicList数据
    const name = menuItem[0].name
    const tracks = menuItem[0].songList
    this.setData({
      musicList: {
        name,
        tracks
      }
    })
    // 3.设置对应的导航标题
    wx.setNavigationBarTitle({
      title: name
    })
  },
  // 处理个人中心tabs数据
  async handleProfileTabInfo(tabname, title) {
    // 1.获取对应的集合
    const collection = database.collection(`c_${tabname}`)
    // 2.获取对应的数据
    const res = await collection.where({
      _openid: wx.getStorageSync('openId')
    }).get()
    this.setData({
      musicList: {
        name: title,
        tracks: res.data
      }
    })
    // 3.设置对应的导航标题
    wx.setNavigationBarTitle({
      title
    })
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
  // 获取仓库中的歌曲列表
  handleToGetSongList(event) {
    const index = event.currentTarget.dataset.index
    playSongListStore.setState('playSongList', this.data.musicList.tracks)
    playSongListStore.setState('playSongListIndex', index)
  },
  // 获取我的歌单仓库数据
  handleMenuStore(value) {
    this.setData({
      menuList: value
    })
  },

  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleStoreCallback)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState("recommendMusicInfo", this.handleStoreCallback)
    }
    menuStore.offState("menuList", this.handleMenuStore)
  }
})