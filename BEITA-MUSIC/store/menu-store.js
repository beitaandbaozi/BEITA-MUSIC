// 歌单数据共享
import {
  HYEventStore
} from 'hy-event-store'
import {
  menuCollection
} from '../database/index'

const menuStore = new HYEventStore({
  state: {
    // 歌单列表
    menuList: []
  },
  actions: {
    // 获取歌单数据
    async fetchMenuListAction(ctx) {
      // 1.获取数据库中对应用户的歌单数据
      const res = await menuCollection.query()
      ctx.menuList = res.data
    }
  }
})
// 这里放在这里运行的原因是因为 只要导入这个文件，就会自动执行这个业务  也可以放在app.js达到一样的效果
menuStore.dispatch("fetchMenuListAction")
export default menuStore