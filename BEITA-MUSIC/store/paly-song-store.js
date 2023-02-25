import {
  HYEventStore
} from 'hy-event-store'

const playSongListStore = new HYEventStore({
  state:{
    // 歌曲列表
    songList: []
  }
})

export default playSongListStore