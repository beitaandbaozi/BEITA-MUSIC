import {
  beitaRequest
} from '../../servers/beita-request'
/**
 * 
 * @param {type} 资源类型,对应以下类型,默认为 0 即 PC 
 */
export const getBunnerList = (type = 0) => {
  return beitaRequest.get("/banner", {
    type
  })
}