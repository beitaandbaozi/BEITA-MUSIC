// 连接数据库
import {
  favorCollection,
  likeCollection
} from '../../database/index'

import {
  database,
  menuCollection
} from '../../database/index'

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
    },
    // 我的歌单数据
    menuList: {
      type: Array,
      value: [],
      required: false
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
        itemList: ['收藏⭐', '喜爱💖', '添加到歌单'],
      }).then(res => {
        this.handleOperationResult(res.tapIndex)
      }).catch(() => {
        console.log('点击取消')
      })
    },
    // 选择收藏、喜欢、添加歌单响应
    async handleOperationResult(index) {
      let res = null
      switch (index) {
        // 收藏
        case 0:
          res = await favorCollection.add(this.properties.itemData)
          break;
          // 喜爱
        case 1:
          res = await likeCollection.add(this.properties.itemData)
          break;
          // 添加到歌单
        case 2:
          // 展示歌单的actionSheet
          const menuItemName = this.properties.menuList.map(item => item.name)
          wx.showActionSheet({
            itemList: menuItemName
          }).then(res => {
            this.handleSingToMenus(res.tapIndex)
          }).catch(() => {
            console.log('点击取消')
          })
        default:
          break;
      }
      if (res) {
        const title = index === 0 ? '收藏' : '喜爱'
        wx.showToast({
          title: `${title}成功🥳`
        })
      }
    },
    // 歌曲添加到歌单
    async handleSingToMenus(index) {
      // 1.获取当前选择的歌单和歌曲
      const menuItem = this.properties.menuList[index]
      const data = this.properties.itemData
      // 2.将歌曲添加到对应的歌单
      const cmd = database.command
      const res = await menuCollection.update(menuItem._id, {
        songList: cmd.push(data)
      })

      if (res) {
        wx.showToast({
          title: '添加成功'
        })
      }
    }
  }
})