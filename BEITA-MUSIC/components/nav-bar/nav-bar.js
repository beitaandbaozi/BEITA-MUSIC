const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "beita自定义导航栏"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight: 20,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      this.setData({
        statusHeight: app.globalData.statusHeight
      })
    }
  }
})