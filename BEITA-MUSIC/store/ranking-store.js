/**
 * 储存巅峰榜的数据
 */
import {
  HYEventStore
} from 'hy-event-store'

import {
  getRecommendList
} from '../api/music/music'

// 映射关系
const rankingMap = {
  newRanking: 3779629,
  origionRanking: 2884035,
  upRanking: 19723756
}
const rankingStore = new HYEventStore({
  state: {
    // 新歌
    newRanking: [],
    // 原创
    origionRanking: [],
    // 飙升
    upRanking: []
  },
  actions: {
    featchRankingData(ctx) {
      for (const key in rankingMap) {
        // 获取对应的映射id
        const id = rankingMap[key]
        // 获取请求
        getRecommendList(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})


export default rankingStore