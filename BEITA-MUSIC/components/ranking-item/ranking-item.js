// components/ranking-item/ranking-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: 'newRanking'
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
    // 点击跳转到更多页面
    handleToMoreMusic() {
      wx.navigateTo({
        url: `/pages/detail-song/detail-song?type=ranking&key=${this.properties.key}`,
      })
    }
  }
})