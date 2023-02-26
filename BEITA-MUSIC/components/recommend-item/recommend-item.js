// components/recommend-item/recommend-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
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
    // 点击跳转到播放器
    handleToPlayerMusic() {
      wx.navigateTo({
        url: `/packPlayer/pages/player-music/player-music?id=${this.properties.itemData.id}`,
      })
    }
  }
})