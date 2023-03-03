// 连接数据库
const database = wx.cloud.database()
const favorCol = database.collection('c_favor')
const likeCol = database.collection('c_like')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到播放器
    handleToPlayerMusic() {
      wx.navigateTo({
        url: `/packagePlayer/pages/player-music/player-music?id=${this.properties.itemData.id}`,
      })
    },
    // 点击icon
    handleMoreIconTap() {
      // 1.展示 ActionSheet
      wx.showActionSheet({
        itemList: ['⭐', '💖'],
      }).then(res => {
        this.handleOperationResult(res.tapIndex)
      }).catch(() => {
        console.log('点击取消')
      })
    },
    // 选择收藏和喜欢响应
    async handleOperationResult(index) {
      let res = null
      switch (index) {
        // 收藏
        case 0:
          res = await favorCol.add({
            data: this.properties.itemData
          })
          break;
          // 喜爱
        case 1:
          res = await likeCol.add({
            data: this.properties.itemData
          })
          break;
        default:
          break;
      }
      if (res) {
        const title = index === 0 ? '收藏' : '喜爱'
        wx.showToast({
          title: `${title}成功🥳`
        })
      }
    }
  }
})