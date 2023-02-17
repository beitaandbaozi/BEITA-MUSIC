import {
  getMusicTagList,
  getHotMuiscList
} from '../../api/music/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌单数据
    musicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.featchData()
  },
  // 获取请求数据
  async featchData() {
    // 获取tag分类
    const {
      tags
    } = await getMusicTagList()
    // 根据获取的分类来请求对应的数据
    // 这里肯定是要等分类出来，所以再进行请求  ====> await 来阻塞
    // 但是这样要重复请求10次(tag的数目)  ======> 渲染10次 ====>影响性能
    // 解决方法 =====> 等待所有数据请求好，再一起渲染 =====> 使用 Promise.all
    let allPromiseRequest = []
    for (let i = 0; i < tags.length; i++) {
      const promise = getHotMuiscList(tags[i].name).catch(() => {})
      allPromiseRequest.push(promise)
    }

    Promise.all(allPromiseRequest).then(res => {
      this.setData({
        musicList: res
      })
    })
  }
})