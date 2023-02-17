const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题"
    },
    musicList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 设备宽度
    screenWidth: 375
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到更多页面
    handleToMore() {
      wx.navigateTo({
        url: '/pages/menu-more/menu-more',
      })
    }
  },
  lifetimes: {
    ready() {
      this.setData({
        screenWidth: app.globalData.screenWidth
      })
    }
  }
})