/**
 * 获取视频的所有请求API
 */

import {
  beitaRequest
} from '../../servers/beita-request'

/**
 * 获取视频
 * limit: 取出数量 , 默认为 30
 * area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const getTopMvList = (limit = 20, offset = 0) => {
  return beitaRequest.get("/top/mv", {
    limit,
    offset
  })
}
/**
 * 获取MV播放地址
 * id：number
 */
export const fetchMvUrlById = (id) => {
  return beitaRequest.get("/mv/url", {
    id
  })
}

/**
 * 获取MV信息
 * id:number
 */
export const fetchMvInfoById = (id) => {
  return beitaRequest.get("/mv/detail", {
    mvid: id
  })
}
/**
 * 获取推荐视频
 * id:number
 */
export const fetchRecommendMvById = (id) => {
  return beitaRequest.get("/related/allvideo",{
    id
  })
}
