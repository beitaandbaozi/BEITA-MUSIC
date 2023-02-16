import {
  beitaRequest
} from '../../servers/beita-request'
/**
 * 获取轮播图数据
 * @param {type} 资源类型,对应以下类型,默认为 0 即 PC 
 */
export const getBunnerList = (type = 0) => {
  return beitaRequest.get("/banner", {
    type
  })
}
/***
 * 获取推荐歌曲列表
 * 新歌 id=3779629
 * 原创 id=2884035
 * 飙升 id=19723756
 * 热歌 id=3778678
 */
export const getRecommendList = (id = 3778678) => {
  return beitaRequest.get("/playlist/detail", {
    id
  })
}