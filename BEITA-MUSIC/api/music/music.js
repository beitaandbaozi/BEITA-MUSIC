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

/**
 * 获取热门歌单
 * 获取推荐歌单
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const getHotMuiscList = (cat = "全部", limit = 6, offset = 0) => {
  return beitaRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

/**
 * 获取热门歌单分类
 */
export const getMusicTagList = () => {
  return beitaRequest.get("/playlist/hot")
}

/***
 * 获取歌曲详情
 * 必选参数 :** `ids`: 音乐 id, 如 `ids=347230`
 */
export const getSongDetail = (ids) => {
  return beitaRequest.get("/song/detail", {
    ids
  })
}
/***
 * 获取歌词信息
 * 必选参数 :** `id`: 音乐 id
 */
export const getSongLyric = (id) => {
  return beitaRequest.get("/lyric", {
    id
  })
}