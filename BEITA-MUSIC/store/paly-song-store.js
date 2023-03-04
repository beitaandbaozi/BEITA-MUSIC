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
import {
  historyCollection
} from '../database/index'

// 创建播放器
export const audioContext = wx.createInnerAudioContext()

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
    // 歌曲是否在播放
    isPlaying: false,
    // 播放模式   0: 顺序播放  1: 单曲循环   2: 随机播放
    playModeIndex: 0,
  },
  actions: {
    // 播放歌曲
    playMusicWithSongIdAction(ctx, id) {
      // 把歌曲的狀態值清空 ====> 防止切換歌曲時，有殘影
      ctx.songDetail = {}
      ctx.currentTime = 0
      ctx.durationTime = 0
      ctx.songLyric = []

      // 设置当前播放歌曲ID
      ctx.playSongId = id
      // 改變歌曲狀態
      ctx.isPlaying = true
      // 获取歌曲详情信息
      getSongDetail(id).then(res => {
        ctx.songDetail = res.songs[0]
        ctx.durationTime = res.songs[0].dt

        // 将改歌曲信息添加到历史记录数据库中
        historyCollection.add(ctx.songDetail)
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
          if (!ctx.isPlaying) return;
          audioContext.play()
        })
        audioContext.onEnded(() => {
          // 播放结束的响应事件
          // 當前歌曲狀態為單曲循環時，不播放下一首歌曲
          if (audioContext.loop) return;
          // TODO: 切換歌曲
          this.dispatch('playNewMusicAction')
        })
      }
    },
    // 改變歌曲播放狀態
    changeMusicStatusAction(ctx) {
      if (!audioContext.paused) {
        audioContext.pause()
        ctx.isPlaying = false
      } else {
        audioContext.play()
        ctx.isPlaying = true
      }
    },
    // 改變歌曲的播放模式
    changePlayMode(ctx) {
      let playModeIndex = ctx.playModeIndex
      playModeIndex = playModeIndex + 1
      // 边界处理
      if (playModeIndex === 3) playModeIndex = 0
      // 判斷是單曲循環的形式  ====> 當前歌曲狀態為循環播放
      if (playModeIndex === 1) audioContext.loop = true
      // 映射名称
      ctx.playModeIndex = playModeIndex
    },
    // 切換歌曲
    playNewMusicAction(ctx, isNextSong = true) {
      // 1.获取当前歌曲所在的索引
      let index = ctx.playSongIndex
      const length = ctx.playSongList.length
      // 2.处理索引值 ======> index的值其实就下一首歌的索引，所以播放模式也是在这里处理
      switch (ctx.playModeIndex) {
        // 顺序播放  ====> 正常的上一首和下一首切换
        // 单曲循环
        case 1:
        case 0:
          index = isNextSong ? index + 1 : index - 1
          // 3.处理边界情况
          if (index === length - 1) index = 0
          if (index === -1) index = length - 1
          break;
          // 随机播放
        case 2:
          index = Math.floor(Math.random() * length)
          break
        default:
          break;
      }
      // 4.获取当前索引值在播放列表中的数据
      const newSong = ctx.playSongList[index]
      // 5.播放歌曲
      // 5.2 业务操作
      this.dispatch('playMusicWithSongIdAction', newSong.id)
      // 6.在store记录最新的索引
      ctx.playSongIndex = index
    }
  }
})

export default playSongListStore