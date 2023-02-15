// 封装成类
class BEITAREQUTEST {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
}
BEITAREQUTEST.prototype.request = function(url, method, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: this.baseUrl + url,
      method,
      data: params,
      success: (res) => resolve(res.data),
      fail: reject
    })
  })
}
BEITAREQUTEST.prototype.get = function(url, params) {
  return this.request(url, "GET", params)
}
BEITAREQUTEST.prototype.post = function(url, params) {
  return this.request(url, "POST", params)
}
export const beitaRequest = new BEITAREQUTEST('http://codercba.com:9002/')