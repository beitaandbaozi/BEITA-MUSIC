![logo-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/logo-v1.png)





------



## 项目介绍

BEITA-MUSIC是基于微信原生小程序开发的音乐应用，组件方面配置了Vant小程序版本，基于 "音乐"、"视频"、”我的“三个tabBar页面进行业务开发。



## 功能列表

### 音乐

![main-music-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/main-music-v1.png)![main-music-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/main-music-v2.png)![main-music-v3](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/main-music-v3.png)



#### 推荐歌曲

![recommend-music](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/recommend-more-v1.png)



#### 热门歌单、推荐歌单

![hot-menu-more-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/hot-menu-more-v1.png)![hot-menu-more-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/hot-menu-more-v2.png)![hot-menu-item](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/hot-menu-item.png)



#### 巅峰榜

![ranking-more-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/ranking-more-v1.png)



#### 播放器

![player-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/player-v1.png)![player-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/player-v2.png)![player-v3](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/player-v3.png)![player-v4](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/player-v4.png)



### 视频

![main-video-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/main-video-v1.png)![main-video-item-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/main-video-item-v1.png)



### 我的

#### 登录

![profile-login-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-login-v1.png)![profile-login-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-login-v2.png)



#### 我的收藏、我的喜欢、历史记录

![profile-favor-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-favor-v1.png)![profile-like-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-like-v1.png)![profile-history-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-history-v1.png)

#### 歌单

![profile-tabs-options](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-tabs-options.png)![profile-menu-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-menu-v1.png)![profile-menu-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/profile-menu-v2.png)



### 搜索

![search-detail-v1](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/search-detail-v1.png)![search-detail-v2](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/search-detail-v2.png)![search-detail-v3](https://raw.githubusercontent.com/beitaandbaozi/BEITA-MUSIC/main/demo-image/search-detail-v3.png)



## 不足之处

- 歌曲的数据加载应该使用虚拟列表的加载来实现
- 搜索功能目前只提供了热门搜索，后续添加上搜索历史
- 搜索结果目前只提供了单曲，后续可以加上一个tab栏，展示单曲、MV、歌手信息等数据

## FAQ

由于搜索功能接口返回值的name是undefined，所以目前暂时不坐搜索功能展示的结果😵😵😵     (已完成)

## 更新日志

- 2023-3-7  修复点击删除歌单icon时进入歌单页面
- 2023-3-9  抽取播放栏为公共组件，并在播放歌曲时在各个页面使用
- 2023-3-11 
  - 使用wx.createIntersectionObserver()封装useLazyData，让数据进入可视区的时候再进行加载
  - 首页轮播图、推荐歌曲、热门歌单、推荐歌单、巅峰榜数据使用数据懒加载初始化数据并使用骨架屏进行页面合理性调整
- 2023-3-21
  - 搜索结果页面渲染已经对应的功能补充
  - 搜索详情页面中，点击'猜你喜欢'中的文字也进行对应的搜索功能