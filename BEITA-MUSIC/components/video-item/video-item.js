// components/video-item/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoItem: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 条状到详情页
    handleToDetails() {
      let item = this.properties.videoItem
      wx.navigateTo({
        url: `/packageVideo/pages/detail-video/detail-video?id=${item.id}`,
      })
    }
  }
})