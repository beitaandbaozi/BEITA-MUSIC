import {
  getDjCatelist,
  getDjContent
} from "../../api/search/search"
const app = getApp()
Page({
  data: {
    // 主要内容高度
    mainHeight: 0,
    // 电台分类列表
    djCateList: [],
    // 电台对应内容
    djContent: []
  },
  onLoad() {
    this.setData({
      mainHeight: app.globalData.contentHeight,
    });
    this.fetchData()
  },
  // ==================== 事件响应 ===============
  async fetchData() {
    await this.fetchDjCatelist()
    await this.fetchDjContent(this.data.djCateList[0].id)
  },
  // 获取电台分类列表数据
  async fetchDjCatelist() {
    const res = await getDjCatelist()
    // 处理数据
    if (res.categories) {
      const newList = res.categories.map(obj => ({
        id: obj.id,
        name: obj.name
      }));
      this.setData({
        djCateList: newList
      })
    }
  },
  // 根据rid获取对应分类内容
  fetchDjContent(id) {
    getDjContent(id).then(res => {
      this.setData({
        djContent: res.data
      })
    })
  },

  // 切换tab
  onChange(event) {
    const id = event.currentTarget.dataset.rid
    this.fetchDjContent(id)
  },
  handleNavBack() {
    wx.navigateBack()
  }
})