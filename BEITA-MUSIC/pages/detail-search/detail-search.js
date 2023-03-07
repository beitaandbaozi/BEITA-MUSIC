import {
  getHotSearchData,
  getSearchData
} from '../../api/search/search'
Page({
  data: {
    // 搜索词
    searchValue: '',
    // 热门搜索列表
    hotSearchDataList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取热门搜索数据
    this.fetchHostSearchData()
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
  handleSearch() {
    // 搜索的内容
    const keywords = this.data.searchValue;
    getSearchData(keywords).then(res => {
      console.log(res)
    })
  }

})