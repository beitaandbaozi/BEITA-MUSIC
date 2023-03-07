import {
  beitaRequest
} from '../../servers/beita-request'

// 热门搜索
export const getHotSearchData = () => {
  return beitaRequest.get("/search/hot")
}

// 搜索结果
/**
 * 必选参数 : keywords关键词
 * 可选参数 :
 * limit : 返回数量 , 默认为 30 `offset` : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
export const getSearchData = (type = 1, keywords) => {
  return beitaRequest.get("/search", {
    type,
    keywords
  })
}