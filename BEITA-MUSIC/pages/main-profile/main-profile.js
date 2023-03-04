import {
  menuCollection
} from '../../database/index'
import menuStore from '../../store/menu-store'

Page({
  data: {
    // 是否已经登录
    isLogin: false,
    // 个人信息
    userInfo: {},
    // tabs信息
    tabs: [{
        name: '我的收藏',
        type: 'favor'
      },
      {
        name: '我的喜欢',
        type: 'like'
      },
      {
        name: '历史记录',
        type: 'history'
      }
    ],
    // 创建歌单对话框
    isShowDialog: false,
    // 歌单名称
    menuName: "",
    // 歌单列表
    menuList: []
  },
  onLoad() {
    // 判断用户是否已经登录
    const userInfo = wx.getStorageSync('userInfo')
    const openId = wx.getStorageSync('openId')
    this.setData({
      isLogin: !!openId
    })
    if (this.data.isLogin) {
      this.setData({
        userInfo
      })
    }
    // 仓库中的歌单数据
    menuStore.onState("menuList", this.handleMenuStore)
  },
  //========================== 事件绑定 =========================
  // 登录
  async handleLogin() {
    // 1.发起请求获取用户信息
    const profileRes = await wx.getUserProfile({
      desc: '获取您的头像和昵称',
    })
    // 2.获取用户的openId
    const openIdRes = await wx.cloud.callFunction({
      name: 'music-login'
    })
    const openId = openIdRes.result.openid
    // 3.保存在本地
    wx.setStorageSync('userInfo', profileRes.userInfo)
    wx.setStorageSync('openId', openId)
    // 4.保存
    this.setData({
      isLogin: true,
      userInfo: profileRes.userInfo
    })
  },
  // 点击tabs
  handleToTabsItem(event) {
    const item = event.currentTarget.dataset.item
    // 跳转
    wx.navigateTo({
      url: `/pages/detail-song/detail-song?type=profile&tabname=${item.type}&title=${item.name}`,
    })
  },
  // 点击打开创建歌单对话框
  handleShowDialog() {
    this.setData({
      isShowDialog: true
    })
  },
  // 创建歌单
  async handleCreateMenu() {
    // 1.拼接数据
    const menuName = this.data.menuName
    // 2.模拟歌单数据
    const menuRecord = {
      name: menuName,
      songList: []
    }
    // 3.连接数据库
    const res = await menuCollection.add(menuRecord)
    // 4.提示信息
    if (res) {
      wx.showToast({
        title: `创建歌单成功`,
      })
      // 重新获取数据库信息，刷新页面数据
      menuStore.dispatch("fetchMenuListAction")
    }
  },
  //  ============================= store中的事件 =======================
  handleMenuStore(value) {
    this.setData({
      menuList: value
    })
  },
  onUnload() {
    menuStore.offState("menuList", this.handleMenuStore)
  }
})