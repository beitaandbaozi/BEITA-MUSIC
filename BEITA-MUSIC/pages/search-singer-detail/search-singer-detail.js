import {
  getArtistList
} from '../../api/search/search'
Page({
  data: {
    // 歌手分类
    singerTypeList: [{
        id: -1,
        name: '全部'
      },
      {
        id: 1,
        name: '男歌手'
      },
      {
        id: 2,
        name: '女歌手'
      },
      {
        id: 3,
        name: '乐队'
      }
    ],
    // 地区分类
    areaTypeList: [{
        id: -1,
        name: "全部"
      },
      {
        id: 7,
        name: "华语"
      },
      {
        id: 96,
        name: "欧美"
      },
      {
        id: 8,
        name: "日本"
      },
      {
        id: 16,
        name: "韩国"
      },
      {
        id: 0,
        name: "其他"
      },
    ],
    // 当前点击歌手的索引
    currentSingerIndex: 0,
    // 当前点击地区的索引
    currentAreaIndex: 0,
    // 数据列表
    dataList: [],
    // 当前点击歌手的id
    currentSingerId: -1,
    // 当前点击地区的id
    currentAreaId: -1,
    // 偏移量
    offset: 0,
    // 是否还有数据
    hasMore: true
  },
  onLoad() {
    // 初始化先加载歌手和地区全部的信息
    this.featchData(this.data.currentSingerId, this.data.currentAreaId)
  },
  // ========= 事件响应 ================
  async featchData(type, area, offset) {
    // getArtistList(type, area).then(res => {
    //   this.setData({
    //     dataList: res.artists
    //   })
    // })
    // 1. 获取数据
    const res = await getArtistList(type, area, offset)
    // 2. 拼接之前的数据
    const newDataList = [...this.data.dataList, ...res.artists]
    this.setData({
      dataList: newDataList
    })
    // 3.offset和加载更多标识
    this.data.offset = this.data.dataList.length
    this.data.hasMore = res.more
  },

  handleSelectSinger(event) {
    const {
      index,
      id
    } = event.currentTarget.dataset
    this.setData({
      currentSingerId: id,
      currentSingerIndex: index
    })
    // 清空之前的数据
    this.data.dataList = []
    this.data.offset = 0
    this.data.hasMore = true
    // 重新加载数据
    this.featchData(this.data.currentSingerId, this.data.currentAreaId,
      this.data.offset)
  },
  handleSelectArea(event) {
    const {
      index,
      id
    } = event.currentTarget.dataset
    // 清空之前的数据
    this.data.dataList = []
    this.data.offset = 0
    this.data.hasMore = true
    // 重新加载数据
    this.setData({
      currentAreaId: id,
      currentAreaIndex: index
    })
    this.featchData(this.data.currentSingerId, this.data.currentAreaId,
      this.data.offset)
  },
  // ======= 上拉加载
  onReachBottom() {
    // 1. 是否全部加载完毕
    if (!this.data.hasMore) return
    // 2. 加载数据
    this.featchData(this.data.currentSingerId, this.data.currentAreaId,
      this.data.offset)
  },
  // ====== 下拉刷新
  async onPullDownRefresh() {
    // 1. 清空之前的数据
    this.data.dataList = []
    this.data.offset = 0
    this.data.hasMore = true
    this.data.currentSingerId = -1
    this.data.currentAreaId = -1
    // 2. 加载数据
    await this.featchData(this.data.currentSingerId, this.data.currentAreaId,
      this.data.offset)
    // 3. 等待第二步加载完，再关闭下拉刷新状态
    wx.stopPullDownRefresh()
  }
})