import {
  getBunnerList,
  getHotMuiscList
} from '../../api/music/music'

import {
  querySelect,
  beitaThrottle
} from "../../utils/common"

import recommendStore from '../../store/recommend-store'
import rankingStore from '../../store/ranking-store'

const querySelectThrottle = beitaThrottle(querySelect, 100)
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索词
    searchValue: '',
    // 轮播图数据
    bannerList: [],
    // 轮播图高度
    bannerHeight: 150,
    // 推荐歌曲列表
    recommendList: [],
    // 热门歌单列表
    hotMusicList: [],
    // 推荐歌单
    recommendMusicList: [],
    // 设备宽度
    screenWidth: 375,
    // 巅峰榜
    rankingInfo: {}
  },
  onLoad() {
    this.featchData()
    this.setData({
      screenWidth: app.globalData.screenWidth
    })
  },

  // 获取页面请求数据
  featchData() {
    // 获取轮播图数据
    getBunnerList().then(res => {
      this.setData({
        bannerList: res.banners
      })
    })
    // 获取推荐歌曲列表
    recommendStore.dispatch("fetchRecommendMusicList")
    recommendStore.onState("recommendMusicInfo", (value) => {
      if (!value.tracks) return
      // 更改数值
      this.setData({
        recommendList: value.tracks.slice(0, 6)
      })
    })
    // 获取热门歌单列表
    getHotMuiscList().then(res => {
      this.setData({
        hotMusicList: res.playlists
      })
    })
    // 获取推荐歌单列表
    getHotMuiscList("流行").then(res => {
      this.setData({
        recommendMusicList: res.playlists
      })
    })
    // 获取巅峰榜数据
    rankingStore.dispatch("featchRankingData")
    rankingStore.onState("newRanking", (value) => {
      // 记得拼接之前的数据
      const newRankingInfo = {
        ...this.data.rankingInfo,
        newRanking: value
      }
      this.setData({
        rankingInfo: newRankingInfo
      })
    })
    rankingStore.onState("origionRanking", (value) => {
      const origionRankingInfo = {
        ...this.data.rankingInfo,
        origionRanking: value
      }
      this.setData({
        rankingInfo: origionRankingInfo
      })
    })
    rankingStore.onState("upRanking", (value) => {
      const upRankingInfo = {
        ...this.data.rankingInfo,
        upRanking: value
      }
      this.setData({
        rankingInfo: upRankingInfo
      })
    })
  },
  // 点击搜索框跳转到搜索页面
  handleToSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  // 动态计算轮播图的高度，使其与图片的高度一样
  // 执行频率过高，使用节流来优化
  handleComputedBunnerHeight() {
    // 1.获取图片组件的高度
    // 2.设置高度
    querySelectThrottle('.image').then(res => {
      this.setData({
        bannerHeight: res[0].height
      })
    })
  },
  // 跳转到更多页面
  handleToMoreMusic() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song',
    })
  },

  onUnload() {
    recommendStore.offState("recommendMusicInfo", (value) => {
      if (!value.tracks) return
      // 更改数值
      this.setData({
        recommendList: value.tracks.slice(0, 6)
      })
    })
  }
})