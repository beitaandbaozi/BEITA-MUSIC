import {
  HYEventStore
} from 'hy-event-store'
import {
  getSongDetail,
  getSongLyric
} from '../api/music/music'
import {
  parseLyric
} from '../utils/common'

// 创建播放器
const audioContext = wx.createInnerAudioContext()

const playSongListStore = new HYEventStore({
  state: {
    // 播放列表
    playSongList: [],
    // 当前歌曲在播放列表中的索引
    playSongIndex: -1,
    // 歌曲内容
    songDetail: {},
    // 歌词内容
    songLyric: [],
    // 当前歌曲播放到的时间
    currentTime: 0,
    // 歌曲总时间
    durationTime: 0,
    // 当前歌曲载入的歌词
    currentLyric: '',
    // 当前歌曲歌词的索引,用来做优化
    currentLyricIndex: -1,
    // 当前播放歌曲的id
    playSongId: 0,
    // 只在第一次渲染时监听audioContext
    isFirstPlay: true,
  },
  actions: {
    setupPlaySong(ctx, id) {
      // 设置当前播放歌曲ID
      ctx.playSongId = id
      // 获取歌曲详情信息
      getSongDetail(id).then(res => {
        ctx.songDetail = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      // 获取歌词信息
      getSongLyric(id).then(res => {
        const lrc = parseLyric(res.lrc.lyric)
        ctx.songLyric = lrc
      })

      // 播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      // 监听歌曲播放进度
      if (ctx.isFirstPlay) {
        ctx.isFirstPlay = false
        audioContext.onTimeUpdate(() => {
          // 1.獲取當前播放的時間
          ctx.currentTime = audioContext.currentTime * 1000
          // 2.动态计算当前显示的歌词
          if (!ctx.songLyric.length) return
          let index = ctx.songLyric.length - 1;
          for (let i = 0; i < ctx.songLyric.length; i++) {
            const info = ctx.songLyric[i]
            if (info.time > audioContext.currentTime * 1000) {
              // 说明是在前一句歌词，还没到这一句
              index = i - 1
              break
            }
          }
          // 防止同一时段同一时间更新同一句歌词
          if (index === ctx.currentLyricIndex) return;
          // 更新歌词
          // 更新歌词需要滚动位置   ===> 其中 35 是为每一句歌词设置的高度
          ctx.currentLyric = ctx.songLyric[index].text
          ctx.currentLyricIndex = index
        })
        audioContext.onWaiting(() => {
          audioContext.pause()
        })
        audioContext.onCanplay(() => {
          // 暂停时，调整进度时===> 不播放歌曲
          // if (this.data.isPause) return;
          audioContext.play()
        })
        audioContext.onEnded(() => {
          // 播放结束的响应事件
          // 當前歌曲狀態為單曲循環時，不播放下一首歌曲
          if (audioContext.loop) return;
          // TODO: 切換歌曲
        })
      }
    }
  }
})

export default playSongListStore