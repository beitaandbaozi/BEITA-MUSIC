import {
  beitaRequest
} from '../../servers/beita-request'

// 热门搜索
export const getHotSearchData = () => {
  return beitaRequest.get("/search/hot")
}