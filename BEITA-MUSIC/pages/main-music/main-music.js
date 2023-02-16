import {
  getBunnerList,
} from '../../api/music/music'

import {
  querySelect,
  beitaThrottle
} from "../../utils/common"

import recommendStore from '../../store/recommend-store'

const querySelectThrottle = beitaThrottle(querySelect, 100)
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
    recommendList: []
  },
  onLoad() {
    this.featchData()
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
      // 取出前六个数据
      const newValue = value.slice(0, 6)
      // 更改数值
      this.setData({
        recommendList: newValue
      })
    })
    // getRecommendList().then(res => {
    //   // 取出前六个数据
    //   const musicList = res.playlist.tracks.slice(0, 6)
    //   this.setData({
    //     recommendList: musicList
    //   })
    // })
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
      url: '/pages/detail-recommend/detail-recommend',
    })
  }
})