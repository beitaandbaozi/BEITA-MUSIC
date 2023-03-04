import {
  menuCollection
} from '../../database/index'
import menuStore from '../../store/menu-store'
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
    // 删除歌单
    async handleDeleteMenu() {
      // 获取当前歌单的_id
      const _id = this.properties.itemData._id
      // 连接数据库删除数据
      const res = await menuCollection.remove(_id)
      // 提示信息
      if(res) {
        wx.showToast({
          title: '删除歌单成功',
        })
        // 重新请求数据
        menuStore.dispatch("fetchMenuListAction")
      }
    }
  }
})