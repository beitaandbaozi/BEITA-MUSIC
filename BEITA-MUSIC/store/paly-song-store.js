import {
  HYEventStore
} from 'hy-event-store'

const playSongListStore = new HYEventStore({
  state:{
    // 歌曲列表
    songList: [],
    // 当前点击的歌曲对应的索引
    songIndex: 0
  }
})

export default playSongListStore