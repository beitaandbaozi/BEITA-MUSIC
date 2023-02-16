/**
 * 首页上展示推荐歌曲只有6首，实际上比6首还有，而且点击更多会跳转到详情页面，不可能在详情页面重新发
 * 请求获取重复的数据，所以要做数据共享处理
 */
import {
  HYEventStore
} from 'hy-event-store'
import {
  getRecommendList
} from '../api/music/music'


const recommendStore = new HYEventStore({
  state: {
    recommendMusicInfo: {}
  },
  actions: {
    // 获取推荐歌曲
    fetchRecommendMusicList(ctx) {
      getRecommendList().then(res => {
        ctx.recommendMusicInfo = res.playlist.tracks
      })
    }
  }
})

export default recommendStore