import {
  beitaThrottle
} from "../../../utils/common";

import playSongListStore, {
  audioContext,
} from "../../../store/paly-song-store";

const app = getApp();
// 播放模式名称映射
const PlayModeNameMap = {
  0: "order",
  1: "repeat",
  2: "random",
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 歌曲内容
    songDetail: {},
    // 歌词内容
    songLyric: [],
    // 当前歌曲播放到的时间
    currentTime: 0,
    // 歌曲总时间
    durationTime: 0,
    // 进度条   ===> （当前播放的时间/总时间） * 100
    sliderValue: 0,
    // 是否进行滑动操作
    isSliderChanging: false,
    // 当前歌曲载入的歌词
    currentLyric: "",
    // 当前歌曲歌词的索引,用来做优化
    currentLyricIndex: -1,
    // 当前歌词需要滚动的位置 ===> 配合scroll-view中的 scroll-top使用
    lyricScrollTop: 0,
    // 播放列表
    playSongList: [],
    // 当前歌曲在播放列表中的索引
    playSongListIndex: -1,
    // 当前播放歌曲的id
    playSongId: 0,
    // 只在第一次渲染时监听audioContext
    isFirstPlay: true,
    // 播放模式名称
    playModeName: "order",
    // 歌曲是否播放
    isPlaying: false,

    // 倉庫中的key值
    storeKeys: [
      "songDetail",
      "songLyric",
      "currentTime",
      "durationTime",
      "currentLyric",
      "currentLyricIndex",
      "playSongId",
      "isPlaying",
      "playModeIndex",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递过来的id值  ===> 根据id值获取歌曲详情和歌词
    const {
      id
    } = options;
    // 0.更改轮播图高度(获取设备信息)
    this.setData({
      swiperHeight: app.globalData.contentHeight,
    });
    // 1.播放歌曲
    // 1.1 如果id有值，説明是點擊一首新歌進去的，而不是退到首頁中的播放欄點擊進來的
    // 首頁中點擊進來不需要傳id，因爲已經是傳進來過了，是退到才能顯示首頁中的播放欄
    if (id) {
      playSongListStore.dispatch("playMusicWithSongIdAction", id);
    }

    // 2.获取存放在仓库中的歌曲列表
    playSongListStore.onStates(
      ["playSongList", "playSongListIndex"],
      this.handleGetPlaySongInfos
    );
    // 2.獲取存放在倉庫中的對應數據
    playSongListStore.onStates(this.data.storeKeys, this.handleGetStoreInfos);
  },

  // ============================ 播放相關的業務 ======================

  // 歌曲播放响应
  updateProgress: beitaThrottle(function (currentTime) {
    console.log("updateProgress");
    // !!! 當在拖動整個進度條時，就不要更新了 ====> 等鬆開時更新
    if (this.data.isSliderChanging) return;
    // 記錄當前時間和当前播放进度条
    const sliderValue = (currentTime / this.data.durationTime) * 100;
    this.setData({
      currentTime,
      sliderValue: sliderValue,
    });
  }, 1000),
  // 点进进度条调整音乐播放时间
  handleSliderChange(event) {
    const value = event.detail.value;
    // 计算当前的时间
    const currentTime = (value / 100) * this.data.durationTime;
    // 更新时间
    audioContext.seek(currentTime / 1000);
    this.setData({
      currentTime,
    });
  },
  // 拖动进度条调整音乐播放时间
  // 這裏使用節流的原因是因爲 每次拖動的時候都會setData來更新currentTime
  // 而且setData更新會導致頁面重新刷新 ====> 太頻繁了  ====> 節流來限制
  handleSliderChanging: beitaThrottle(function (event) {
    const value = event.detail.value;
    // 滑动此时不需要更改播放进度，而是松手之后才更改，所以不使用 audioContext.seek()
    // 由于 onTimeUpdate 一直都在运行 所以设置一个变量来控制一下
    const currentTime = (value / 100) * this.data.durationTime;
    this.setData({
      currentTime,
      isSliderChanging: true,
    });
  }, 100),

  // 暂停和播放音乐
  toggleMusicStatus() {
    playSongListStore.dispatch("changeMusicStatusAction");
  },
  // 切换上一首歌曲
  handlePrevBtnMusic() {
    playSongListStore.dispatch("playNewMusicAction", false);
  },
  // 切换下一首
  handleNextBtnMusic() {
    playSongListStore.dispatch("playNewMusicAction");
  },
  // 切换音乐播放模式
  handleChangePlayMode() {
    playSongListStore.dispatch("changePlayMode");
  },

  // ============================ 其他事件響應 =================

  // 轮播切换响应
  handleSwiperChange(event) {
    this.setData({
      currentPage: event.detail.current,
    });
  },
  // 点击标题，切换轮播图页面
  onNavTabItemTap(event) {
    const id = event.currentTarget.dataset.index;
    this.setData({
      currentPage: id,
    });
  },
  // 导航返回
  handleNavBack() {
    wx.navigateBack();
  },

  // ============================== store中的響應======================

  // 获取仓库中的歌曲列表以及对应的索引
  handleGetPlaySongInfos({
    playSongList,
    playSongListIndex
  }) {
    if (playSongList) {
      this.setData({
        playSongList,
      });
    }
    if (playSongListIndex !== undefined) {
      this.setData({
        playSongListIndex,
      });
    }
  },
  // 獲取存放在倉庫中的屬性
  handleGetStoreInfos({
    songDetail,
    songLyric,
    currentTime,
    durationTime,
    currentLyric,
    currentLyricIndex,
    playSongId,
    isPlaying,
    playModeIndex,
  }) {
    // 當前歌曲id
    if (playSongId !== undefined) {
      this.setData({
        playSongId,
      });
    }
    // 當前歌曲的詳細内容
    if (songDetail) {
      this.setData({
        songDetail,
      });
    }
    // 當前歌曲的播放進度時長
    if (currentTime !== undefined) {
      // 根據當前時間改變進度
      this.updateProgress(currentTime);
    }
    // 當前歌曲的總時長
    if (durationTime !== undefined) {
      this.setData({
        durationTime,
      });
    }
    // 當前歌曲的歌詞
    if (songLyric) {
      this.setData({
        songLyric,
      });
    }
    // 當前歌曲正在播放的歌詞
    if (currentLyric) {
      this.setData({
        currentLyric,
      });
    }
    // 當前歌曲正在播放的歌詞的索引
    if (currentLyricIndex !== undefined) {
      // 動態設置高度滾動的高度 ===> 35為設置的每一句歌詞的高度
      this.setData({
        currentLyricIndex,
        lyricScrollTop: currentLyricIndex * 35,
      });
    }
    // 當前歌曲的播放狀態
    if (isPlaying !== undefined) {
      this.setData({
        isPlaying,
      });
    }
    // 當前歌曲的播放模式
    if (playModeIndex !== undefined) {
      this.setData({
        playModeName: PlayModeNameMap[playModeIndex],
      });
    }
  },
  onUnload() {
    // 释放仓库中的数据
    playSongListStore.offStates(
      ["playSongList", "playSongListIndex"],
      this.handleGetPlaySongInfos
    );
    playSongListStore.offStates(this.data.storeKeys, this.handleGetStoreInfos);
  },
});