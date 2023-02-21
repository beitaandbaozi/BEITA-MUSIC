/**
 * 获取组件信息
 */
export const querySelect = (selector) => {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec((res) => {
      resolve(res)
    })
  })
}
/**
 * 节流
 */
export const beitaThrottle = (fn, interval = 200, {
  leading = true,
  trailing = false
} = {}) => {
  let startTime = 0
  let timer = null
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      try {
        // 1.获取当前时间
        const nowTime = new Date().getTime()

        // 对立即执行进行控制
        if (!leading && startTime === 0) {
          startTime = nowTime
        }

        // 2.计算需要等待的时间执行函数
        const waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
          // console.log("执行操作fn")
          if (timer) clearTimeout(timer)
          const res = fn.apply(this, args)
          resolve(res)
          startTime = nowTime
          timer = null
          return
        }

        // 3.判断是否需要执行尾部
        if (trailing && !timer) {
          timer = setTimeout(() => {
            // console.log("执行timer")
            const res = fn.apply(this, args)
            resolve(res)
            startTime = new Date().getTime()
            timer = null
          }, waitTime);
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    startTime = 0
    timer = null
  }
  return _throttle
}

/**
 * 解析歌词  [{time:xxxxx,text:xxxxx},......]
 */
// 解析时间正则表达式
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export const parseLyric = (lyricString) => {
  const lyricStrings = lyricString.split("\n")
  const lyricInfos = []
  for (const lineString of lyricStrings) {
    const timeResult = timeReg.exec(lineString)
    if (!timeResult) continue
    // 1.获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond
    // 2.获取歌词文
    const text = lineString.replace(timeReg, "")
    lyricInfos.push({
      time,
      text
    })
  }

  return lyricInfos
}